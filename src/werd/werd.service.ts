import { PrismaService } from './../prisma/prisma.service';
import { Injectable, UseGuards } from '@nestjs/common';
import { addWerdDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Injectable()
export class WerdService {
  constructor(private prismaService: PrismaService) {}
  async getWerd(duoID: number) {
    const werds = await this.prismaService.werd.findMany({
      where: {
        duoID: +duoID,
      },
    });
    return werds;
  }
  async addWerd(dto: addWerdDto) {
    const werd = await this.prismaService.werd.create({
      data: {
        duoID: +dto.duoID,
      },
    });
    return werd;
  }
}
