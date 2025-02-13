import { Module } from '@nestjs/common';
import { CouponChecksService } from './coupon-checks.service';
import { CouponChecksController } from './coupon-checks.controller';
import { CouponCheck } from './entities/coupon-checks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CouponRulesModule } from 'src/coupon-rule/coupon-rules.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponCheck]),
    AuthModule,
    UsersModule,
    CouponRulesModule,
  ],
  controllers: [CouponChecksController],
  providers: [CouponChecksService],
})
export class CouponChecksModule {}
