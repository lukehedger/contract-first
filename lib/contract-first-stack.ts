import {
  JsonSchemaType,
  JsonSchemaVersion,
  LambdaIntegration,
  Model,
  RestApi,
  RequestValidator,
} from "@aws-cdk/aws-apigateway";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { join } from "path";
import submitRequestSchema from "../schema/submit-request.schema.json";

type JSONSchema = {
  $schema: string;
  title: string;
  type: string;
  properties: JSONSchemaProperties;
  required: string[];
};

type JSONSchemaProperties = {
  [key: string]: { type: string };
};

const mapSchemaProperties = (
  properties: JSONSchemaProperties
): JSONSchemaProperties => {
  const mappedProperties = {} as JSONSchemaProperties;

  Object.keys(properties).map((property) => {
    let propertyType = JsonSchemaType.NULL;

    switch (properties[property].type) {
      case "string":
        propertyType = JsonSchemaType.STRING;
        break;
    }

    mappedProperties[property] = { type: propertyType };
  });

  return mappedProperties;
};

// SEE: https://github.com/aws/aws-cdk/issues/10818
const modelFromSchema = (schema: JSONSchema): any => {
  const model = {
    properties: mapSchemaProperties(schema.properties),
    required: schema.required,
    schema: JsonSchemaVersion.DRAFT4,
    title: schema.title,
    type: JsonSchemaType.OBJECT,
  };

  return model;
};

export class ContractFirstStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new Function(this, "ContractFirst-Function", {
      code: Code.fromAsset(join(__dirname, "lambda")),
      handler: "function.handler",
      runtime: Runtime.NODEJS_12_X,
    });

    const api = new RestApi(this, "ContractFirst-API", {
      restApiName: "ContractFirst-API",
    });

    const submitResource = api.root.addResource("submit");

    const submitRequestValidator = new RequestValidator(
      this,
      "ContractFirst-RequestValidator",
      {
        restApi: api,
        requestValidatorName: "ContractFirst-RequestValidator",
        validateRequestBody: true,
      }
    );

    const submitRequestModel = new Model(this, "ContractFirst-RequestModel", {
      contentType: "application/json",
      modelName: "SubmitRequestModel",
      restApi: api,
      schema: modelFromSchema(submitRequestSchema),
    });

    submitResource.addMethod("POST", new LambdaIntegration(lambdaFunction), {
      requestModels: { "application/json": submitRequestModel },
      requestValidator: submitRequestValidator,
    });
  }
}
