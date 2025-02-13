import { Injectable } from '@nestjs/common';
import { CreateCouponRuleDto } from './dto/create-rule.dto';
import { UpdateCouponRuleDto } from './dto/update-rule.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponRule } from './entities/coupon-rule.entity';
import { UUID } from 'crypto';

@Injectable()
export class CouponRulesService {
  constructor(
    @InjectRepository(CouponRule)
    private readonly couponRuleRepository: Repository<CouponRule>,
  ) {}

  async create(createCouponRuleDto: CreateCouponRuleDto) {
    return await this.couponRuleRepository.save(createCouponRuleDto);
  }

  async findAll(): Promise<CouponRule[]> {
    return await this.couponRuleRepository.find();
  }

  async findOne(id: UUID): Promise<CouponRule | null> {
    return await this.couponRuleRepository.findOne({
      where: { id },
    });
  }
}
