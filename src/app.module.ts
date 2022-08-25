import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { getConfig } from './utils';

@Module({
  // 这边配置使用 yml 不使用 env
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
