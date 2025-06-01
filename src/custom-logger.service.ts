import { Inject, Injectable, LogLevel, OnModuleInit } from '@nestjs/common';
import { Queue, QueueEvents } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import { ModuleRef } from '@nestjs/core';
import { LoggerModuleOptions } from './type';

@Injectable()
export class CustomLoggerService implements OnModuleInit {
  private logQueue: Queue | undefined;
  private readonly projectId: string;
  private readonly queueName: string;

  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject('LOGGER_MODULE_OPTIONS')
    private readonly options: LoggerModuleOptions,
  ) {
    this.projectId = options.projectId;
    this.queueName = options.queueName;
  }

  onModuleInit() {
    const queueToken = getQueueToken(this.queueName);
    this.logQueue = this.moduleRef.get<Queue>(queueToken, { strict: false });
  }

  async error(message: any, trace?: string, context?: string) {
    console.error('error', message);
    await this.pushToQueue('error', message, context, trace);
  }

  async warn(message: any, context?: string) {
    console.warn('warn', message);
    await this.pushToQueue('warn', message, context);
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
    if (this.logQueue) {
      await this.logQueue.add(jobName, log);
    }
  }
}
