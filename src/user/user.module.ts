import { Module } from '@nestjs/common';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, FeishuService, UserService],
  exports: [UserService],
})
export class UserModule {}
