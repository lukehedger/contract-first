import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { SubmitRequest } from "../../types/submit-request";

export const handler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { body: "Hello, Nothing!", statusCode: 200 };
  }

  const body: SubmitRequest = JSON.parse(event.body);

  return { body: body.message, statusCode: 200 };
};
