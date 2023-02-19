import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/database/prisma.service';
import { TokenService } from '../auth/common/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    JwtService,
    TokenService,
  ],
})
export class UserModule {}
