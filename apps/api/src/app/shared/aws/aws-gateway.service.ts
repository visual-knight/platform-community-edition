import { Injectable } from '@nestjs/common';
import { APIGateway } from 'aws-sdk';
import { format, startOfMonth, startOfWeek } from 'date-fns';

@Injectable()
export class AwsApiGatewayService extends APIGateway {
  async getApiUsage(usagePlan: APIGateway.UsagePlan, keyId: string) {
    const startDate = format(this.getPeriodStartDate(usagePlan), 'YYYY-MM-DD');
    const endDate = format(new Date(), 'YYYY-MM-DD');
    const apiKeyUsage = await this.getUsage({
      startDate,
      endDate,
      usagePlanId: usagePlan.id,
      keyId
    }).promise();

    const values = apiKeyUsage.items[keyId];
    const used = this.getNumberOfRequestsForApiKeyInPeriod(values);
    const remaining = values
      ? this.getNumberOfRemainingRequestsForApiKeyInPeriod(values)
      : usagePlan.quota.limit - used;
    const totalQuota = values ? used + remaining : usagePlan.quota.limit;

    return {
      used,
      remaining,
      totalQuota
    };
  }

  private getPeriodStartDate(usagePlan: APIGateway.UsagePlan): Date {
    const period = (usagePlan.quota && usagePlan.quota.period) || 'MONTH';
    const today = new Date();

    const todayUTC = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      today.getUTCHours(),
      today.getUTCMinutes(),
      today.getUTCSeconds()
    );

    switch (period) {
      case 'DAY':
        return todayUTC;
      case 'WEEK':
        return startOfWeek(todayUTC);
      case 'MONTH':
        return startOfMonth(todayUTC);
      default:
        throw new Error('Invalid Usage Plan Quota Period');
    }
  }

  private getNumberOfRequestsForApiKeyInPeriod(apiKeyUsage: any) {
    if (!apiKeyUsage) {
      return 0;
    }

    const apiKeyUsageArray = !Array.isArray(apiKeyUsage[0])
      ? [apiKeyUsage]
      : apiKeyUsage;

    return apiKeyUsageArray.reduce(
      (runningSubTotal, [numRequests]) => runningSubTotal + numRequests,
      0
    );
  }

  private getNumberOfRemainingRequestsForApiKeyInPeriod(apiKeyUsage: any) {
    const apiKeyUsageArray = !Array.isArray(apiKeyUsage[0])
      ? [apiKeyUsage]
      : apiKeyUsage;

    const remainingIndex = 1;
    const latestRemaining =
      apiKeyUsageArray[apiKeyUsageArray.length - 1][remainingIndex];
    const latestRemainingNumber =
      typeof latestRemaining !== 'number' || isNaN(latestRemaining)
        ? -1
        : latestRemaining;
    return latestRemainingNumber;
  }
}
