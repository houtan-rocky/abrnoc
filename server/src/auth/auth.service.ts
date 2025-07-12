import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const payload = { username: user.username, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.validateUser(loginUserDto);
    const payload = { username: user.username, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
