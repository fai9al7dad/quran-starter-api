import { Module } from '@nestjs/common';
import { DuoController } from './duo.controller';
import { DuoService } from './duo.service';

@Module({
  controllers: [DuoController],
  providers: [DuoService]
})
export class DuoModule {}
