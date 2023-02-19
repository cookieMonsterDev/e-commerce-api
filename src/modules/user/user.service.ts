import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findOne(userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    return user;
  }
}
