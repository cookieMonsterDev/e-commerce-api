import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type TokenProps = {
  userId: string | number;
  role: string;
};

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(
    args: TokenProps,
    expirationTime: string | number = '1h',
  ): string {
    return this.jwtService.sign(args, { expiresIn: expirationTime });
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
