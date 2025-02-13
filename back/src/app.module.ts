import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CouponRulesModule } from './coupon-rule/coupon-rules.module';
import { CouponRule } from './coupon-rule/entities/coupon-rule.entity';
import { CouponCheck } from './coupon-check/entities/coupon-checks.entity';
import { CouponChecksModule } from './coupon-check/coupon-checks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [User, CouponRule, CouponCheck],
        synchronize: false,
        uuidExtension: 'uuid-ossp',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CouponRulesModule,
    CouponChecksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
