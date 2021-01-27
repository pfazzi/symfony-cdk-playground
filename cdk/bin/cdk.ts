#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SymfonyDemoStack } from '../lib/symfony-demo-stack';

const app = new cdk.App();
new SymfonyDemoStack(app, 'symfony-demo-stack');
