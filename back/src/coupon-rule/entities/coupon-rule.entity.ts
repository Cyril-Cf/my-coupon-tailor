import { UUID } from 'crypto';
import { CouponCheck } from '../../coupon-check/entities/coupon-checks.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum CouponType {
  FECHO = 'FECHO',
  PAIPAR = 'PAIPAIR',
  FECHOPAIR = 'FECHOPAIR',
}

@Entity('coupon-rules')
export class CouponRule {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: CouponType,
    nullable: false,
  })
  type: CouponType;

  @Column({ nullable: false, type: 'json' })
  parameters: JSON;

  @Column({ nullable: false, type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: false, type: 'timestamp' })
  modified_at: Date;

  @Column({ nullable: false, default: 1.0 })
  version: number;

  @OneToMany(() => CouponCheck, (couponCheck) => couponCheck.couponRule)
  couponChecks: CouponCheck[];

  @ManyToMany(() => CouponRule)
  @JoinTable({
    name: 'coupon_rule_dependencies',
    joinColumn: { name: 'rule_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'dependency_id', referencedColumnName: 'id' },
  })
  dependencies: CouponRule[];
}
