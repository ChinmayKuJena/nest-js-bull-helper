import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CustomLoggerService } from './custom-logger.service';

export interface LoggerModuleOptions {
  connection: {
    host: string;
    port: number;
  };
  queueName: string;
  projectId: string;
}

@Module({})
export class LoggerModule {
  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        BullModule.forRoot({
          connection: options.connection,
        }),
        BullModule.registerQueue({
          name: options.queueName,
        }),
      ],
      providers: [
        {
          provide: 'LOGGER_MODULE_OPTIONS',
          useValue: options,
        },
        CustomLoggerService,
      ],
      exports: [CustomLoggerService],
    };
  }
}
