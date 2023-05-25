/**
 * Evaluates an expression in postfix notation.
 *
 * The expression MAY contain variables surrounded by curly braces
 * which are substituted according to the `valueByName` map.
 *
 * Tokens (i.e. variables, operators, and operands) SHOULD
 * be delimited by white-space.
 *
 * The time complexity of the algorithm is O(n),
 * where n is the length of the expression.
 *
 * A safe alternative to eval.
 *
 * @example
 * evaluatePostfixExpression('{a} {b} -', {a: "4", b: "3"}) // => 1
 *
 * @param {string} expression Expression in postfix notation with variables surrounded
 *                            by curly braces and tokens delimited by white-space.
 * @param {Object.<string, string>} valueByName Map of variable values by name.
 * @returns {*} Result of evaluated expression.
 *              A number for an arithmetic expression or boolean for relational expression.
 */
function evaluatePostfixExpression(expression, valueByName = {}) {
    const stack = [];
    const operationByOperator = {
        // Arithmetic operators
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "^": (a, b) => a ** b,

        // Relational operators
        "<": (a, b) => a < b,
        "≤": (a, b) => a <= b,
        ">": (a, b) => a > b,
        "≥": (a, b) => a >= b,
        "=": (a, b) => a == b,
        "≠": (a, b) => a != b
    };
    for (const token of tokens(expression, valueByName)) {
        const operation = operationByOperator[token];
        if (operation) {
            const b = stack.pop();
            const a = stack.pop();
            const result = operation(a, b);
            stack.push(result);
        } else {
            const operand = parseFloat(token);
            if (!Number.isNaN(operand)) {
                stack.push(operand);
            }
        }
    }
    return stack.pop();
}

function* tokens(expression, valueByName) {
    let token = "";
    for (const character of substitutedVariables(expression, valueByName)) {
        if (character !== " ") {
            token += character;
        } else {
            if (token) {
                yield token;
                token = "";
            }
        }
    }
    yield token;
}

function* substitutedVariables(expression, valueByName) {
    let start = -1;
    for (let i = 0; i < expression.length; i++) {
        const character = expression[i];
        if (character === "{") {
            start = i;
        } else if (character === "}") {
            const name = expression.substring(start + 1, i);
            const value = valueByName[name];
            for (const valueCharacter of value) {
                yield valueCharacter;
            }
            start = -1;
        } else if (start < 0) {
            yield character;
        }
    }
}
