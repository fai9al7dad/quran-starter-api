import { Module } from '@nestjs/common';
import { WerdService } from './werd.service';
import { WerdController } from './werd.controller';

@Module({
  providers: [WerdService],
  controllers: [WerdController]
})
export class WerdModule {}
