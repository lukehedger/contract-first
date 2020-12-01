import "@aws-cdk/assert/jest";
import { App } from "@aws-cdk/core";
import { ContractFirstStack } from "../contract-first-stack";

let stack: ContractFirstStack;

beforeAll(() => {
  const app = new App();

  stack = new ContractFirstStack(app, "ContractFirstStack");
});

test("Stack has no resources", () => {
  expect(stack).toMatchTemplate({
    Resources: {},
  });
});
