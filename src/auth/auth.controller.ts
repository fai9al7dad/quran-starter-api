import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
