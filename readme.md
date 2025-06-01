

---

# 🪵 NestJS BullMQ Logger Helper

A dynamic NestJS module to enable automatic log publishing to BullMQ queues and real-time WebSocket log streaming (consumer WIP).

## 📦 Installation

```bash
npm install @chinmay20409/nest-js-bull-helper
```

> Make sure you have Redis running locally or remotely.

---

## 🚀 Usage in a NestJS Project

### 1. Import the `LoggerModule` in your `AppModule`:

```ts
import { LoggerModule } from '@chinmay20409/nest-js-bull-helper';

@Module({
  imports: [
    LoggerModule.register({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
      queueName: 'order-logs1',
      projectId: 'capp',
    }),
  ],
})
export class AppModule {}
```

### 2. Inject and use `CustomLoggerService` anywhere:

```ts
import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from '@chinmay20409/nest-js-bull-helper';

@Injectable()
export class SomeService {
  constructor(private readonly logger: CustomLoggerService) {}

  someMethod() {
    this.logger.error('Something went wrong', 'stack trace', 'SomeService');
    this.logger.warn('Just a warning', 'SomeService');
  }
}
```

---

## 🛠 Features

* ✅ Easy setup with `LoggerModule.register({...})`
* ✅ Queue name, project ID, and Redis credentials configurable
* ✅ Logs are automatically pushed to the queue — **no extra code required**
* 🧩 (Coming Soon) Real-time WebSocket dashboard (via `ConsumerLoggerModule`)

---

## 🧪 Local Development

To build locally:

```bash
npm run build
```

To update version (make sure git is clean):

```bash
npm version patch
npm publish --access public
```

---

## 🤝 Contribution

Feel free to open PRs or issues if you'd like to help improve the module.

---

Let me know if you want a separate README section for the `ConsumerLoggerModule` too.
