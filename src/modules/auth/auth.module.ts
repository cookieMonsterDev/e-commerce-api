import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './common/token/token.service';
import { TokenStrategy } from './common/strategies/token.strategy';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SERVICE'),
        signOptions: { expiresIn: '10s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    TokenService,
    TokenStrategy,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
