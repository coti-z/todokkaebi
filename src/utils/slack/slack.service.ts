import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackNotificationService {
  private slackClient: WebClient;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('SLACK_BOT_TOKEN');
    this.slackClient = new WebClient(token);
  }

  async sendErrorNotification(context: Record<string, any>) {
    try {
      this.slackClient.chat.postMessage({
        channel: this.configService.get<string>('SLACK_CHANNEL') ?? 'null',
        text: JSON.stringify(context),
      });
    } catch (slackError) {
      console.error('Failed to send Slack notification:', slackError);
    }
  }
}
