import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { LoginInput, RegisterInput } from './dto';
import * as argon from 'argon2';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async validateUser(loginInput: LoginInput): Promise<User | null> {
    const { email, password } = loginInput;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    const pasMatch = user && await argon.verify(user.hash, password);

    if (user && pasMatch) {
      const { hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const token = this.tokenService.generateToken({
      userId: user.id,
      role: user.role,
    });

    return { user, token };
  }

  async register(registerInput: RegisterInput) {
    const { password, ...rest } = registerInput;

    const hash = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: { ...rest, hash },
    });

    const token = this.tokenService.generateToken({
      userId: user.id,
      role: user.role,
    });

    return { user, token };
  }
}
