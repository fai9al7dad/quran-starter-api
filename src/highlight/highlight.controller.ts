import { AuthGuard } from '@nestjs/passport';
import { addHighlightDto } from './dto/highlight.dto';
import { HighlightService } from './highlight.service';
import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';

@Controller('highlight')
export class HighlightController {
  constructor(private hightLightService: HighlightService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('werd-id/:werdID')
  getHighlightsByWerd(@Param() params) {
    return this.hightLightService.getHighlightsByWerd(params.werdID);
  }
  @Post('add')
  addHighlight(@Body() dto: addHighlightDto) {
    return this.hightLightService.addHighlight(dto);
  }
}
