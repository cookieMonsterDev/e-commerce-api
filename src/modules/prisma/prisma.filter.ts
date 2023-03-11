import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const takenFields = exception.meta.target as string[];
        const status = HttpStatus.CONFLICT;
        const messages = takenFields.map((e) => `${e} is taken`);
        response.status(status).json({
          statusCode: status,
          message: messages,
          error: 'Forbidden',
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
