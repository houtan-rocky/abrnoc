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

  private omitPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { username, email, password } = createUserDto; // ignore confirmPassword
    const existingUser = this.users.find(
      (user) => user.username === username || user.email === email,
    );

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      id: this.userIdCounter.toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    this.userIdCounter++;

    return this.omitPassword(user);
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

    return this.omitPassword(user);
  }

  findById(id: string): Omit<User, 'password'> | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return this.omitPassword(user);
  }
}
