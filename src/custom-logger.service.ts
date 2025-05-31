import { Inject, Injectable, LogLevel } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LoggerModuleOptions } from './logger.module';

@Injectable()
export class CustomLoggerService {
  private readonly projectId: string;

  constructor(
    @InjectQueue('order-logs') private readonly logQueue: Queue,
    @Inject('LOGGER_MODULE_OPTIONS') private readonly options: LoggerModuleOptions,
  ) {
    this.projectId = this.options.projectId;
  }

  async error(message: any, trace?: string, context?: string) {
    console.error('error', message);
    this.pushToQueue('error', message, context, trace);
  }

  async warn(message: any, context?: string) {
    console.warn('warn', message);
    this.pushToQueue('warn', message, context);
  }

  private async pushToQueue(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const log = {
      projectId: this.projectId,
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      trace,
    };

    const jobName = `${level}-log`;
    await this.logQueue.add(jobName, log);
  }
}
