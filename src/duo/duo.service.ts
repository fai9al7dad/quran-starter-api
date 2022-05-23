import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { addWerdDto } from 'src/werd/dto';
import { addDuoDto } from './dto';

@Injectable()
export class DuoService {
  constructor(private prismaService: PrismaService) {}
  // get duos
  async getDuosAsCorrector(authID: number) {
    const allDuos = await this.prismaService.duo.findMany({
      where: { correctorID: authID },
    });
    if (!allDuos.length) {
      throw new HttpException(
        'no duos found where you are corrector',
        HttpStatus.NOT_FOUND,
      );
    }
    return allDuos;
  }
  async getDuosAsReciter(authID: number) {
    const allDuos = await this.prismaService.duo.findMany({
      where: { reciterID: authID },
    });
    if (!allDuos.length) {
      throw new HttpException(
        'no duos found where you are reciter',
        HttpStatus.NOT_FOUND,
      );
    }
    return allDuos;
  }
  // add duo
  async addDuo(authID: number, dto: addDuoDto) {
    try {
      const isDuoExist = await this.prismaService.duo.findFirst({
        where: {
          correctorID: authID,
          reciterID: +dto.reciter,
        },
      });
      if (isDuoExist) {
        throw new HttpException('duo already exists', HttpStatus.CONFLICT);
      }
      const duo = await this.prismaService.duo.create({
        data: {
          correctorID: authID,
          reciterID: +dto.reciter,
        },
      });
      return duo;
    } catch (e) {
      throw new HttpException(e, HttpStatus.CONFLICT);
    }
  }
  // search duo
}
