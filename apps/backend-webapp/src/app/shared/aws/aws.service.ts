import { Injectable } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { APIGateway, IAM } from 'aws-sdk';
import { Product } from '../product/product.service';
import { AwsIamService } from './aws-iam.service';
import { AwsLambdaService } from './aws-lambda.service';
import { AwsApiGatewayService } from './aws-gateway.service';

@Injectable()
export class AwsService {
  private usagePlansCache: APIGateway.UsagePlan[];

  constructor(
    private awsApiGatewayService: AwsApiGatewayService,
    private awsLambdaService: AwsLambdaService,
    private awsIamService: AwsIamService
  ) {
    this.updateAwsUsagePlansCache();
  }

  getUsagePlans() {
    return this.usagePlansCache;
  }

  async updateAwsUsagePlansCache() {
    this.usagePlansCache = [];

    const params = {
      limit: 10
    };

    this.usagePlansCache = (await this.awsApiGatewayService
      .getUsagePlans(params)
      .promise()).items;
  }

  async createIamUser(
    contractId: string,
    product: Product
  ): Promise<{ AccessKey: IAM.AccessKey; apiKey: string; apiKeyId: string }> {
    await this.awsIamService.createUser({
      UserName: contractId,
      Path: environment.aws.iAmPath
    });

    await this.awsIamService
      .addUserToGroup({
        GroupName: environment.aws.iAmGroupName,
        UserName: contractId
      })
      .promise();

    const accessKeyData = await this.awsIamService
      .createAccessKey({
        UserName: contractId
      })
      .promise();

    const apiKeyData = await this.awsApiGatewayService
      .createApiKey({
        enabled: true,
        generateDistinctId: true,
        name: contractId
      })
      .promise();

    const usagePlanIdForCreateApi = this.getAwsUsagePlanIdByProduct(product);
    await this.awsApiGatewayService
      .createUsagePlanKey({
        keyId: apiKeyData.id,
        keyType: 'API_KEY',
        usagePlanId: usagePlanIdForCreateApi
      })
      .promise();

    const usagePlanIdForTestsessionApi = this.getUsagePlans().find(
      plan => plan.name === `testsession_${environment.stage.toLowerCase()}`
    ).id;
    await this.awsApiGatewayService
      .createUsagePlanKey({
        keyId: apiKeyData.id,
        keyType: 'API_KEY',
        usagePlanId: usagePlanIdForTestsessionApi
      })
      .promise();

    return {
      AccessKey: accessKeyData.AccessKey,
      apiKey: apiKeyData.value,
      apiKeyId: apiKeyData.id
    };
  }

  async setupS3BucketForUser(
    contractId: string,
    accessKeyId: string,
    secretAccessKey: string
  ) {
    if (environment.stage === 'development') {
      return true;
    }

    const payload = {
      contractId,
      accessKeyId,
      secretAccessKey,
      stage: environment.stage
    };

    const lambdaFunctionConfigAddBucketNotification = {
      FunctionName: 'addBucketNotification',
      Payload: JSON.stringify(payload),
      InvocationType: 'Event'
    };
    return this.awsLambdaService
      .invoke(lambdaFunctionConfigAddBucketNotification)
      .promise();
  }

  getAwsUsagePlanIdByProduct(product: Product) {
    const usagePlans = this.getUsagePlans();
    return usagePlans.find(
      p =>
        p.name ===
        `${product.nickname.toLowerCase()}_${environment.stage.toLowerCase()}`
    ).id;
  }

  getAwsUsagePlanByProduct(product: Product) {
    const usagePlans = this.getUsagePlans();
    return usagePlans.find(
      p =>
        p.name ===
        `${product.nickname.toLowerCase()}_${environment.stage.toLowerCase()}`
    );
  }

  async updateAwsUsagePlan(
    oldProduct: Product,
    newProduct: Product,
    apiKeyId: string
  ) {
    await this.awsApiGatewayService
      .deleteUsagePlanKey({
        keyId: apiKeyId,
        usagePlanId: this.getAwsUsagePlanIdByProduct(oldProduct)
      })
      .promise();

    return this.awsApiGatewayService
      .createUsagePlanKey({
        keyId: apiKeyId,
        keyType: 'API_KEY',
        usagePlanId: this.getAwsUsagePlanIdByProduct(newProduct)
      })
      .promise();
  }
}
