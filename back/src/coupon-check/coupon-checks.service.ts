import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckCouponDto } from './dto/check-coupon.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponCheck } from './entities/coupon-checks.entity';
import {
  CouponRule,
  CouponType,
} from 'src/coupon-rule/entities/coupon-rule.entity';
import { CouponRulesService } from 'src/coupon-rule/coupon-rules.service';

@Injectable()
export class CouponChecksService {
  constructor(
    @InjectRepository(CouponCheck)
    private readonly couponCheckRepository: Repository<CouponCheck>,
    private readonly couponRuleService: CouponRulesService,
  ) {}

  async verifyCouponWithRuleId(
    checkCouponDto: CheckCouponDto,
  ): Promise<CouponCheck | null> {
    const RULE = await this.get_rule_from_check(checkCouponDto);
    if (!RULE) {
      throw new NotFoundException('Rule not found');
    }
    const is_valid = await this.checkCoupon(RULE);
    return this.save_check_to_db(RULE, is_valid);
  }

  async checkCoupon(rule: CouponRule): Promise<boolean> {
    if (rule.dependencies && rule.dependencies.length > 0) {
      for (const dependency of rule.dependencies) {
        const isDependencyValid = await this.checkCoupon(dependency);
        if (!isDependencyValid) {
          return false;
        }
      }
    }

    let is_valid = false;
    switch (rule.type) {
      case CouponType.FECHO:
        is_valid = await this.check_rule_fecho(rule);
        break;
      case CouponType.FECHOPAIR:
        is_valid = await this.check_rule_fechopair(rule);
        break;
      case CouponType.PAIPAR:
        is_valid = await this.check_rule_paipair(rule);
        break;
      default:
        throw new NotFoundException('Rule not found');
    }

    return is_valid;
  }

  async get_rule_from_check(
    checkCouponDto: CheckCouponDto,
  ): Promise<CouponRule | null> {
    // Later, maybe we can extract a more secured ID, from a JWT for example
    return this.couponRuleService.findOneWithDependencies(
      checkCouponDto.rule_id,
    );
  }

  async get_weather_broadcast(
    city: string,
  ): Promise<{ condition: string; temperature: number }> {
    // FAIRE UN CALL A UNE API WEATHER
    // const API_KEY = 'TON_API_KEY_METEO';
    // const response = await axios.get(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    // );
    // const weatherData = response.data;
    // return {
    //   condition: weatherData.weather[0].main.toLowerCase(),
    //   temperature: weatherData.main.temp,
    // };
    return { condition: 'sunny', temperature: 20 };
  }

  async check_rule_fecho(rule: CouponRule): Promise<boolean> {
    const params = rule.parameters as Record<string, any>;
    if (!params.FECHO) {
      throw new Error('JSON is missing attribute FECHO');
    }

    const { city, condition, temperature_above } = params.FECHO;
    const weather = await this.get_weather_broadcast(city);

    return (
      weather.condition.includes(condition) &&
      weather.temperature >= temperature_above
    );
  }

  async check_rule_fechopair(rule: CouponRule): Promise<boolean> {
    // no extra check required for now, if all dependencies (rules) have been resolved let this one pass
    return true;
  }
  async check_rule_paipair(rule: CouponRule): Promise<boolean> {
    const params = rule.parameters as Record<string, any>;
    if (!params.PAIPAIR || !params.PAIPAIR.even_day_only) {
      throw new Error(
        'JSON is missing attribute PAIPAIR or attribute even_day_only',
      );
    }
    const today = new Date().getDate();
    if (params.PAIPAIR.even_day_only) {
      return today % 2 === 0;
    } else {
      return !(today % 2 === 0);
    }
  }

  async save_check_to_db(
    rule: CouponRule,
    is_valid: boolean,
  ): Promise<CouponCheck> {
    const newCheck = this.couponCheckRepository.create({
      created_at: new Date(),
      is_valid,
      couponRule: rule,
    });
    return await this.couponCheckRepository.save(newCheck);
  }
}
