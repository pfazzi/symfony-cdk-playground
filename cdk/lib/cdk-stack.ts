import * as cdk from '@aws-cdk/core';
import * as php_service from './service'

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new php_service.Service(this, 'PhpService');
  }
}
