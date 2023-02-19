import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenInputs } from './token.types';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) {}

  generateToken({ userId, email, role }: TokenInputs) {
    return this.jwtService.sign(
      { userId, email, role }
    );
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token) as TokenInputs
  }
}
