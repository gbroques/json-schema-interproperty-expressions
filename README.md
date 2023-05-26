# JSON Schema Interproperty Expressions

**Motivation:** [JSON Schema](https://json-schema.org/) provides a comprehensive [vocabulary](https://json-schema.org/learn/glossary.html#vocabulary) for property-level constraints, but lacks a vocabulary for complex constraints *between* properties.

The JSON Schema interproperty expressions [extension](https://json-schema.org/understanding-json-schema/reference/schema.html) provides a vocabulary for defining constraints between properties as [relational expressions](https://en.wikipedia.org/wiki/Relational_operator).

Simple use-cases for interproperty expressions are:

* ensuring an end date is after a start date
  
  <details>
    <summary>Expand JSON schema</summary>

    ```json
    {
      "type": "object",
      "properties": {
        "startDate": {
          "type": "string",
          "title": "Start Date"
        },
        "endDate": {
          "type": "string",
          "title": "End Date"
        }
      },
      "interpropertyExpressions": [
        {
          // Equivalent expression in infix notation:
          // {startDate} < {endDate}
          "expression": "{startDate} {endDate} <",
          "type": "postfix",
          "message": "End date must be after start date.",
          "properties": ["startDate", "endDate"]
        }
      ]
    }
    ```
  </details>

* ensuring a confirmation password is the same as a password

  <details>
    <summary>Expand JSON schema</summary>

    ```json
    {
      "type": "object",
      "properties": {
        "password": {
          "type": "string",
          "title": "Password"
        },
        "confirmationPassword": {
          "type": "string",
          "title": "Confirm Password"
        }
      },
      "interpropertyExpressions": [
        {
          // Equivalent expression in infix notation:
          // {password} = {confirmationPassword}
          "expression": "{password} {confirmationPassword} =",
          "type": "postfix",
          "message": "Confirmation password must match password.",
          "properties": ["password", "confirmationPassword"]
        }
      ]
    }
    ```
  </details>

This repository features an advanced [CAD](https://en.wikipedia.org/wiki/Computer-aided_design) example where the user inputs values defining the [hub](https://en.wikipedia.org/wiki/Wheel#Hub) and [rotor](https://en.wikipedia.org/wiki/Rotor_(electric)) for an [electric generator](https://en.wikipedia.org/wiki/Electric_generator).

To run the demo, open [`index.html`](./index.html) in your web browser of choice.

This demo uses an expression in [postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), as it's easy to evaluate using a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)), and doesn't require the use of [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) which poses security risks.

(⚠️ *Edge cases are not tested.*)

The below **GIF** demonstrates validating the complex relationship between three related inputs explained by the **Diagram**.

The user can adjust any of the three inputs when the constraint is violated.

|GIF|Diagram|
|---|---|
|![Demo](./json-schema-interproperty-expressions-demo.gif)|![Diagram](./diagram.svg)|

[`diagram.drawio`](./diagram.drawio) may be edited at https://app.diagrams.net/
