import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { BullModule } from '@nestjs/bull';

const { REDIS_URL } = process.env;

@Module({
  imports: [
    BullModule.forRoot({
      redis: REDIS_URL,
    }),
    BullModule.registerQueue({
      name: 'queue',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
