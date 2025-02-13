import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CouponChecksService } from './coupon-checks.service';
import { CheckCouponDto } from './dto/check-coupon.dto';

@Controller('coupon-checks')
export class CouponChecksController {
  constructor(private readonly couponChecksService: CouponChecksService) {}

  @Post()
  async checkCoupon(@Body() checkCouponDto: CheckCouponDto) {
    const COUPON =
      await this.couponChecksService.verifyCouponWithRuleId(checkCouponDto);
    if (!COUPON) {
      throw new BadRequestException('La vérification est impossible.');
    }

    if (COUPON.is_valid) {
      return {
        statusCode: 200,
        message: 'Coupon valide.',
      };
    } else {
      throw new UnauthorizedException('Coupon non valide.');
    }
  }
}
