# Contract-First Development

## Universal Schema

> JSON Schema-based, client-server data definitions for _contract-first development_

### Shared (Frontend and Backend)

- JSON Schema to define API requests and responses, including error responses

### Frontend

- Yup schema to validate user input, **generated from shared JSON Schema**
- TypeScript type definitions to validate developer input (request and response), **generated from shared JSON Schema**

### Backend

- API request validation to validate user/client-generated input, **generated from shared JSON Schema**
- OpenAPI specification, **generated from shared JSON Schema**
- _Optional: API documentation, generated from OpenAPI specification (e.g. [ReDoc](https://github.com/Redocly/redoc))_

## Example

- React app with Yup form validation and TypeScript type-checking
- Lambda function with typed event body
- _Optional: EventBridge Schema Registry and event bus_
