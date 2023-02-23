import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; //installing from the config

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoriesModule } from './stories/stories.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, StoriesModule, PrismaModule],
})
export class AppModule { }
