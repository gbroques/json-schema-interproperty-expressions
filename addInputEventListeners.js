import evaluatePostfixExpression from "./evaluatePostfixExpression.js";

export default function addInputEventListeners(form, schema, getValidationMessageElement) {
    const handleInput = createInputHandler(form, schema, getValidationMessageElement);
    Object.keys(schema.properties).forEach(property => {
        const inputElement = form[property];
        inputElement.addEventListener("input", handleInput);
    });
}

function createInputHandler(form, schema, getValidationMessageElement) {
    return () => {
        const variables = extractVariables(form, schema);
        for (const interpropertyExpression of schema.interpropertyExpressions) {
            const {expression, type, message, properties} = interpropertyExpression;

            const [isValid, error] = evaluateExpression(type, expression, variables);
            if (error) throw error;
            properties.forEach(property => {
                const inputElement = form[property];
                const validationMessageElement = getValidationMessageElement(inputElement);
                if (!isValid) {
                    inputElement.setCustomValidity(message);
                    validationMessageElement.innerText = message;
                } else {
                    inputElement.setCustomValidity("");
                    validationMessageElement.innerText = "";
                }
            });
        }
    };
}

function evaluateExpression(type, expression, variables) {
    switch(type) {
        case "postfix":
            return evaluatePostfixExpression(expression, variables);
        default:
            throw new TypeError(`"${type}" expressions are not supported.`);
    }
}

function extractVariables(form, schema) {
    const variables = {};
    for (const element of form.elements) {
        const {name, value} = element;
        const {type} = schema.properties[name];
        variables[name] = cast(value, type);
    }
    return variables;
}

/**
 * Casts a string to a JavaScript type based on the JSON Schema type.
 *
 * @see https://json-schema.org/understanding-json-schema/reference/type.html
 *
 * @param {string} value A string value.
 * @param {string} type JSON Schema type.
 * @returns {string|number|boolean} Potentially casted string value.
 */
function cast(value, type) {
    switch(type) {
        case "number":
        case "integer":
            return Number(value);
        case "boolean":
            return Boolean(value);
        default:
            return value;
    }
}
