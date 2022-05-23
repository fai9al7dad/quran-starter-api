import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { DuoService } from './duo.service';
import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { addDuoDto } from './dto';
@UseGuards(AuthGuard('jwt'))
@Controller('duo')
export class DuoController {
  constructor(private duoService: DuoService) {}
  @Get('corrector')
  getDuosAsCorrector(@GetUser('id') authID: number) {
    return this.duoService.getDuosAsCorrector(authID);
  }
  @Get('reciter')
  getDuosAsReciter(@GetUser('id') authID: number) {
    return this.duoService.getDuosAsReciter(authID);
  }
  @Get('add')
  addDuo(@GetUser('id') authID: number, @Body() dto: addDuoDto) {
    return this.duoService.addDuo(authID, dto);
  }
}
