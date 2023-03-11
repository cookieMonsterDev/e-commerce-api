import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TokenModule } from './services/token/token.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    PrismaModule,
    TokenModule,
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}
