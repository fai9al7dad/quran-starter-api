import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DuoModule } from './duo/duo.module';
import { WerdModule } from './werd/werd.module';
import { HighlightModule } from './highlight/highlight.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, DuoModule, WerdModule, HighlightModule],
})
export class AppModule {}
