import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const pasMatch = await argon.verify(user.hash, body.password);

    if (!pasMatch) throw new ForbiddenException('Invalid password');

    const token = this.tokenService.generateToken({
      userId: user.id,
      role: user.role,
    });

    return { ...user, token };
  }

  async register(body: RegisterDto) {
    const { password, ...other } = body;
    const hash = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: { ...other, hash },
    });

    const token = this.tokenService.generateToken({
      userId: user.id,
      role: user.role,
    });

    return { ...user, token };
  }
}
