import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { addHighlightDto } from './dto';

@Injectable()
export class HighlightService {
  constructor(private prisma: PrismaService) {}
  async getHighlightsByWerd(werdID: number) {
    const highlights = await this.prisma.highlight.findMany({
      where: {
        werdID: +werdID,
      },
    });
    return highlights;
  }
  async addHighlight(dto: addHighlightDto) {
    const highlight = await this.prisma.highlight.create({
      data: {
        werdID: +dto.werdID,
        type: dto.type,
        wordID: +dto.wordID,
      },
    });
    return highlight;
  }
}
