import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async searchUser(query: string) {
    const result = await this.prismaService.$queryRaw`
      SELECT * from USER
      WHERE user.username LIKE  ${`%${query}%`}
      OR user.id LIKE ${`%${query}%`}
      `;
    return { result, query };
  }
}
