import { TaskService } from '@/todo/application/services/task.service';
import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { LoggerService } from '@/utils/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskUpdateScheduler {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly taskService: TaskService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleTaskPending() {
    try {
      const num = await this.taskService.updatePendingToINProgress(new Date());
      this.loggerService.info('cron service', {
        update: num,
      });
    } catch {
      throw errorFactory(ErrorCode.BAD_REQUEST);
    }
  }
}
