import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    const users = await this.prisma.user.findMany({select: {
      id: true,
      fistName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }});

    return users;
  }

  async findOneById(userId: string) {
    const {hash, ...rest} = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    return rest;
  }

  async updateOneById(userId: string, body: UpdateUserDto) {
    const {hash, ...rest} = await this.prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });

    return rest;
  }

  async deleteOneById(userId: string) {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: `User ${user.id} has been deleted` };
  }
}
