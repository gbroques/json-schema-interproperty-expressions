/**
 * Evaluates an expression in postfix notation.
 *
 * The expression MAY contain variables surrounded by curly braces
 * which are substituted according to the `variables` map.
 *
 * Tokens (i.e. variables, operators, and operands) SHOULD
 * be delimited by white-space.
 *
 * For supported operators, see below `operators` map.
 *
 * The time complexity of the algorithm is O(n),
 * where n is the length of the expression.
 *
 * A safe alternative to eval.
 *
 * @example
 * evaluatePostfixExpression("{a} {b} -", {a: "4", b: "3"}) // => 1
 * 
 * @example
 * evaluatePostfixExpression(
 *    "{startDate} {endDate} <",
 *    {startDate: "2023-05-25", endDate: "2023-05-26"}
 * ) // => true
 * 
 * @example
 * evaluatePostfixExpression(
 *    "{password} {confirmationPassword} =",
 *    {password: "secret", confirmationPassword: "secret"}
 * ) // => true
 *
 * @param {string} expression Expression in postfix notation with variables surrounded
 *                            by curly braces and tokens delimited by white-space.
 * @param {Object.<string, *>} variables Map of variable values by name.
 * @returns {*} Result of evaluated expression.
 *              A number for an arithmetic expression or boolean for relational expression.
 */
function evaluatePostfixExpression(expression, variables = {}) {
    const stack = [];
    const operators = {
        // Arithmetic operators
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "^": (a, b) => a ** b,
        "%": (a, b) => a % b,

        // Relational operators
        "<": (a, b) => a < b,
        "≤": (a, b) => a <= b,
        ">": (a, b) => a > b,
        "≥": (a, b) => a >= b,
        "=": (a, b) => a == b,
        "≠": (a, b) => a != b
    };
    for (const token of tokens(expression, variables)) {
        const operator = operators[token];
        if (operator) {
            const b = stack.pop();
            const a = stack.pop();
            const result = operator(a, b);
            stack.push(result);
        } else {
            stack.push(token);
        }
    }
    return stack.pop();
}

function* tokens(expression, variables) {
    let token = "";
    for (const value of substitutedVariables(expression, variables)) {
        if (value !== " ") {
            if (typeof value === "string" && value.length === 1) {
                token += value;
            } else {
                yield value; // substituted variable
            }
        } else {
            if (token) {
                yield token;
                token = "";
            }
        }
    }
    yield token;
}

function* substitutedVariables(expression, variables) {
    let start = -1;
    for (let i = 0; i < expression.length; i++) {
        const character = expression[i];
        if (character === "{") {
            start = i;
        } else if (character === "}") {
            const name = expression.substring(start + 1, i);
            const value = variables[name];
            yield value;
            start = -1;
        } else if (start < 0) {
            yield character;
        }
    }
}
