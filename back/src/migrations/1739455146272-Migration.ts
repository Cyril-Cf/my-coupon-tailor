import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCouponRules1739455146272 implements MigrationInterface {
  name = 'InsertCouponRules1739455146272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "coupon-rules" ("id", "name", "type", "parameters", "created_at", "modified_at") 
      VALUES (
        uuid_generate_v4(), 
        'FÉCHO', 
        'FECHO', 
        '{ "FECHO": {"city": "Lyon", "condition": "sunny", "temperature_above": 25}}', 
        now(), 
        now()
      ) 
      RETURNING "id"
    `);
    const fechoId = (
      await queryRunner.query(
        `SELECT "id" FROM "coupon-rules" WHERE "type" = 'FECHO'`,
      )
    )[0].id;

    await queryRunner.query(`
      INSERT INTO "coupon-rules" ("id", "name", "type", "parameters", "created_at", "modified_at") 
      VALUES (
        uuid_generate_v4(), 
        'PAIPAIR', 
        'PAIPAIR', 
        '{ "PAIPAIR": {"even_day_only": true}}', 
        now(), 
        now()
      ) 
      RETURNING "id"
    `);

    const paipairId = (
      await queryRunner.query(
        `SELECT "id" FROM "coupon-rules" WHERE "type" = 'PAIPAIR'`,
      )
    )[0].id;

    await queryRunner.query(`
      INSERT INTO "coupon-rules" ("id", "name", "type", "parameters", "created_at", "modified_at") 
      VALUES (
        uuid_generate_v4(), 
        'FECHOPAIR', 
        'FECHOPAIR', 
        '{"dependencies": ["${fechoId}", "${paipairId}"]}', 
        now(), 
        now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "coupon-rules" WHERE "type" IN ('FECHO', 'PAIPAIR', 'FECHOPAIR')`,
    );
  }
}
