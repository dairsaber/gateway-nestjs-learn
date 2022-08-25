import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // 接口版本化管理
  // 启用版本配置之后再在 Controller 中请求方法添加对应的版本号装饰器： @Version('1')
  // defaultVersion 加了全局版本之后 就不用每个控制器加 @Version('1')
  app.enableVersioning({
    // 这边支持自然 version 也就是 /user  v1/user  v2/user @Version 装饰器上可以用数组
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  await app.listen(3000);
}

bootstrap();
