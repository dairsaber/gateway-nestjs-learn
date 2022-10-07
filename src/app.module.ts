import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { getConfig } from './utils';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  // 这边配置使用 yml 不使用 env
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db,
    }),
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }),
    UserModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
