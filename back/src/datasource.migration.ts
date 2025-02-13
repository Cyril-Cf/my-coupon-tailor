import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/users.entity';
import { CouponRule } from './coupon-rule/entities/coupon-rule.entity';
import { CouponCheck } from './coupon-check/entities/coupon-checks.entity';

dotenv.config({ path: '.env.local' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, CouponRule, CouponCheck],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
