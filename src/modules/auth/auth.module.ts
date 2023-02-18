import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [AuthResolver, AuthService, JwtService, PrismaService]
})
export class AuthModule {}
