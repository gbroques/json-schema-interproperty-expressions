/**
 * Evaluates an expression in postfix notation.
 *
 * @see https://en.wikipedia.org/wiki/Reverse_Polish_notation
 *
 * The expression MAY contain variables surrounded by curly braces
 * which are substituted according to the `variables` map.
 *
 * Tokens (i.e. operators and operands) SHOULD
 * be delimited by white-space.
 *
 * For supported operators, see below `operators` map.
 *
 * Delimiters and operators may be overridden via `config`.
 *
 * Errors are returned as part of the result instead of thrown.
 *
 * The time complexity of the algorithm is O(n),
 * where n is the length of the expression.
 *
 * A safe alternative to eval.
 *
 * @example
 * evaluatePostfixExpression("{a} {b} -", {a: 4, b: 3}) // => 1
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
 *                                       Nested values and dot notation are not supported.
 * @param {Object} config
 * @param {Object.<string, function>} config.operators Map of additional operators, or override existing operators.
 * @param {string} config.variableStartDelimiter Variable start delimiter. Defaults to "{".
 * @param {string} config.variableEndDelimiter Variable end delimiter. Defaults to "}".
 * @param {string} config.tokenDelimiter String to delimit tokens. Defaults to " ".
 * @returns {Array} Two element array containing result of evaluated expression, and potential parsing error.
 *                  Result can be a number for an arithmetic expression or boolean for relational expression.
 */
export default function evaluatePostfixExpression(
    expression,
    variables = {},
    config = {
        operators: {},
        variableStartDelimiter: "{",
        variableEndDelimiter: "}",
        tokenDelimiter: " "
    }
) {
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
        "≠": (a, b) => a != b,

        ...config.operators
    };
    for (const token of tokens(expression, variables, config)) {
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
    const result = stack.pop();
    const error = stack.length ? 
        new Error(`Unevaluated operands "${stack.join(", ")}".`) :
        null;
    return [result, error];
}

function* tokens(expression, variables, config) {
    const {
        variableStartDelimiter, variableEndDelimiter, tokenDelimiter
    } = config;

    let token = "";
    for (const character of expression) {
        if (character === variableEndDelimiter) {
            token = variables[token];
        } else if (character === tokenDelimiter) {
            if (token !== "") {
                yield token;
                token = "";
            }
        } else if (character !== variableStartDelimiter) {
            token += character;
        }
    }
    if (token !== "") yield token;
}
