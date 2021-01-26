import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from 'path';

export class Service extends core.Construct {
    constructor(scope: core.Construct, id: string) {
        super(scope, id);

        const handler = new lambda.Function(this, "PhpServiceHandler", {
            runtime: lambda.Runtime.PROVIDED_AL2,
            layers: [
                lambda.LayerVersion.fromLayerVersionArn(
                    scope,
                    'arn:aws:lambda:eu-central-1:209497400698:layer:php-80-fpm:7',
                    'arn:aws:lambda:eu-central-1:209497400698:layer:php-80-fpm:7'
                )
            ],
            code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'dist')),
            memorySize: 1024,
            handler: 'index.php'
        });

        const api = new apigateway.RestApi(this, "php-service-api", {
            restApiName: "Php Service",
            description: "This service is just a test with CDK and PHP."
        });

        const serviceFrontControllerHandler = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });

        api.root.addMethod("GET", serviceFrontControllerHandler);
    }
}