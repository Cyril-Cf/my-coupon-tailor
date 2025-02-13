import { UUID } from 'crypto';
import { CouponRule } from '../../coupon-rule/entities/coupon-rule.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('coupon-checks')
export class CouponCheck {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: false, type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: false, default: false })
  is_valid: boolean;

  @ManyToOne(() => CouponRule, (couponRule) => couponRule.couponChecks)
  couponRule: CouponRule;
}
