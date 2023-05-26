# JSON Schema Interproperty Expressions

**Motivation:** [JSON Schema](https://json-schema.org/) provides a comprehensive vocabulary for property-level constraints, but lacks a vocabulary for complex constraints between properties.

The JSON Schema interproperty expressions extension provides a vocabulary for defining constraints between properties as [relational expressions](https://en.wikipedia.org/wiki/Relational_operator).

The motivation behind using JSON Schema is to sync validation rules between an API and user-interface written in different programming languages.

Simple use-cases for interproperty constraints are:

* ensuring an end date is after a start date
* ensuring a confirmation password is the same as a password

This repository features an advanced [CAD](https://en.wikipedia.org/wiki/Computer-aided_design) example where the user inputs values defining the [hub](https://en.wikipedia.org/wiki/Wheel#Hub) and [rotor](https://en.wikipedia.org/wiki/Rotor_(electric)) for an [electric generator](https://en.wikipedia.org/wiki/Electric_generator).

To run the demo, open [`index.html`](./index.html) in your web browser of choice.

This demo uses an expression in [postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), as it's easy to evaluate using a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)), and doesn't require the use of [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) which poses security risks.

(⚠️ *Edge cases are not tested.*)

The below GIF demonstrates validating the complex relationship between three related inputs.

The user can adjust any of the three inputs when the constraint is violated.

|Demo|Diagram|
|---|---|
|![Demo](./json-schema-interproperty-expressions-demo.gif)|![Diagram](./diagram.svg)|

[`diagram.drawio`](./diagram.drawio) may be edited at https://app.diagrams.net/
