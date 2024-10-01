import { SlackNotificationService } from '@/utils/slack/slack.service';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(
    private readonly slackNotificationService: SlackNotificationService,
  ) {}
  @Get()
  async healthCheck() {
    return true;
  }
}
