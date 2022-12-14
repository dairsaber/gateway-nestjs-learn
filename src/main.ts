import { ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionsFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc'; // swagger

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // 接口版本化管理
  // 启用版本配置之后再在 Controller 中请求方法添加对应的版本号装饰器： @Version('1')
  // defaultVersion 加了全局版本之后 就不用每个控制器加 @Version('1')
  app.enableVersioning({
    // 这边支持自然 version 也就是 /user  v1/user  v2/user @Version 装饰器上可以用数组
    defaultVersion: [VERSION_NEUTRAL],
    type: VersioningType.URI,
  });

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器 注意这边的filter顺序 从后向前执行
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionsFilter());

  // 创建swagger文档
  generateDocument(app);

  // 开启热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}

bootstrap();
