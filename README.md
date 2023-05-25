# JSON Schema Interproperty Expressions

**Proof-of-concept** for a custom [JSON Schema](https://json-schema.org/)  extension to define interproperty constraints as expressions.

(⚠️ *Edge cases are not tested.*)

The demo uses an expression in [postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) as it's easier to evaluate using a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)), and doesn't require the use of [`eval`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) which poses security risks.

The motivation behind using JSON Schemais to sync validation rules between an API and user-interface written in different programming languages.

The below GIF demonstrates validating a complex relationship between three related inputs.

The user can adjust any of the three inputs when the constraint is violated.

![Demo](./json-schema-interproperty-expressions-demo.gif)
