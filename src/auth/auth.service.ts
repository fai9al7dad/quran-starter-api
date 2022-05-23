import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto, signTokenRes } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    // must repeat otherwise pwCompare will return 500 if user obj is empty
    if (user === null) throw new ForbiddenException('incorrect creds');
    // if user found compare password
    const pwCompare = await argon.verify(user.password, dto.password);
    if (!pwCompare || !user) throw new ForbiddenException('incorrect creds');
    delete user.password;
    return this.signToken(user.id, user.username);
  }

  async register(dto: RegisterDto) {
    // const checkEmail = await this.prisma.user.findUnique({
    //   where: {
    //     email: dto.email,
    //   },
    // });
    // if (checkEmail) {
    //   return { error: 'email must be unique' };
    // }
    const checkUsername = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (checkUsername) {
      return { error: 'username must be unique' };
    }
    // make sure password === confirmPassword
    if (dto.password !== dto.confirmPassword) {
      return {
        error: 'confirm password must be same as password',
      };
    }
    // hash password
    const hash = await argon.hash(dto.password);
    //register user
    const user = await this.prisma.user.create({
      data: {
        // email: dto.email,
        username: dto.username,
        password: hash,
      },
    });
    // return user
    return user;
  }

  async signToken(userID: number, username: string): Promise<signTokenRes> {
    const secret = process.env.JWT_SECRET;
    const payload = {
      sub: userID,
      username,
    };

    const token = await this.jwt.signAsync(payload, { secret });
    return {
      username,
      userID,
      accessToken: token,
    };
  }
}
