import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class OnlySameUserByIdAllowed implements NestInterceptor {
  constructor(private tokenService: TokenService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.tokenService.decodeToken(token);

    try {
      if (
        req.body.variables.input === decodedToken.userId ||
        decodedToken.role === 'ADMIN'
      ) {
        return next.handle();
      } else {
        throw new Error('UNAUTHORIZED');
      }
    } catch (err) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}
