import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

interface DuplicatesInputs {
  username: string;
  email: string;
}

interface TokenInputs {
  userId: number;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp({ password, ...rest }: SignUpInput) {
    await this.duplicatesValidation({
      username: rest.username,
      email: rest.email,
    });
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: { password: hashedPassword, ...rest },
    });

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(
      signInInput.password,
      user.password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  private generateToken({ userId, email, role }: TokenInputs) {
    return this.jwtService.sign(
      { userId, email, role },
      {
        expiresIn: '1h',
        secret: this.configService.get('ACCESS_TOKEN_SERVICE'),
      },
    );
  }

  private async duplicatesValidation(payload: DuplicatesInputs) {
    const users = await this.prisma.user.findMany({
      where: { OR: [{ username: payload.username }, { email: payload.email }] },
    });

    if (users.length !== 0) throw new ForbiddenException('Access denied');

    return;
  }
}
