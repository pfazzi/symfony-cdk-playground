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

        const api = new apigateway.LambdaRestApi(this, "symfony-demo-gateway", {
            handler,
            restApiName: 'symfony-demo-app',
            description: "This service is just a test with CDK, PHP and Symfony."
        });
    }
}