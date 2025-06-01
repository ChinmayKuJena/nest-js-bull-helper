export interface LoggerModuleOptions {
  connection: {
    host: string;
    port: number;
  };
  queueName: string;
  projectId: string;
}
