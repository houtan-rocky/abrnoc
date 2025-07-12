import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private userIdCounter = 1;

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = this.users.find(
      (user) =>
        user.username === createUserDto.username ||
        user.email === createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user: User = {
      id: this.userIdCounter.toString(),
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    this.userIdCounter++;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validateUser(
    loginUserDto: LoginUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = this.users.find(
      (user) => user.username === loginUserDto.username,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findById(id: string): Omit<User, 'password'> | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
