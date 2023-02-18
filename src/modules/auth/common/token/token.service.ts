import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenInputs } from './token.types';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) {}

  async generateToken({ userId, email, role }: TokenInputs) {
    return this.jwtService.sign(
      { userId, email, role }
    );
  }
}
