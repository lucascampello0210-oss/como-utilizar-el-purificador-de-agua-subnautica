import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // Rota de Cadastro
  create(@Body() createUserDto: { name: string; email: string; password: string }) {
    return this.usersService.create(createUserDto);
  }

  @Post('login') // Rota de Login
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    // Validação simples de senha (em produção, use criptografia como bcrypt)
    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }
    
    return { success: true, message: 'Login efetuado!', user };
  }
}
