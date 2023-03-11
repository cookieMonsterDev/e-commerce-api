import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findOneById(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    return user;
  }

  async updateOneById(userId: number, body: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });

    return user;
  }

  async deleteOneById(userId: number) {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: `User ${user.id} has been deleted` };
  }
}
