import { Controller, UseGuards, Get } from '@nestjs/common';
import { CouponRulesService } from './coupon-rules.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('coupon-rules')
export class CouponRulesController {
  constructor(private readonly couponRulesService: CouponRulesService) {}
  @Get()
  @Roles('admin')
  getAll() {
    return this.couponRulesService.findAll();
  }
}
