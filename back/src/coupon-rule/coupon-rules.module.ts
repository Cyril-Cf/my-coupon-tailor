import { Module } from '@nestjs/common';
import { CouponRulesService } from './coupon-rules.service';
import { CouponRulesController } from './coupon-rules.controller';
import { CouponRule } from './entities/coupon-rule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CouponRule]), AuthModule, UsersModule],
  controllers: [CouponRulesController],
  providers: [CouponRulesService],
  exports: [CouponRulesService],
})
export class CouponRulesModule {}
