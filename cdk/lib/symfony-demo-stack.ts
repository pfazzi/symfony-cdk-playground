import * as cdk from '@aws-cdk/core';
import {SymfonyHandler} from "./symfony-handler";

export class SymfonyDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SymfonyHandler(this, 'symfony-demo');
  }
}
