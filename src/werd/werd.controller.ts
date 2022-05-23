import { WerdService } from './werd.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { addWerdDto } from './dto';

@Controller('werd')
export class WerdController {
  constructor(private werdService: WerdService) {}
  @Get('duo-id/:duoID')
  getWerd(@Param() params) {
    return this.werdService.getWerd(params.duoID);
  }
  @Post('/add')
  addWerd(@Body() dto: addWerdDto) {
    return this.werdService.addWerd(dto);
  }
}
