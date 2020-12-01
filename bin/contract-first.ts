#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { ContractFirstStack } from "../lib/contract-first-stack";

const app = new App();

new ContractFirstStack(app, "ContractFirstStack");
