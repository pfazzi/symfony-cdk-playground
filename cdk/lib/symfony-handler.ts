import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as constructs from "constructs";
import * as path from "path";

export class SymfonyHandler extends cdk.Construct {
    constructor(scope: constructs.Construct, id: string) {
        super(scope, id);

        const handler = new lambda.Function(this, "symfony-demo-app", {
            functionName: 'symfony-demo-app',
            description: "A demo Symfony app",
            runtime: lambda.Runtime.PROVIDED_AL2,
            layers: [
                lambda.LayerVersion.fromLayerVersionArn(
                    scope,
                    'arn:aws:lambda:eu-central-1:209497400698:layer:php-80-fpm:7',
                    'arn:aws:lambda:eu-central-1:209497400698:layer:php-80-fpm:7'
                )
            ],
            code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'dist')),
            handler: 'public/index.php',
            memorySize: 1024
        });

        const api = new apigateway.RestApi(this, "symfony-demo-gateway", {
            restApiName: "symfony-demo-gateway",
            description: "This service is just a test with CDK, PHP and Symfony."
        });

        const serviceFrontControllerHandler = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });

        api.root.addMethod("GET", serviceFrontControllerHandler);
    }
}