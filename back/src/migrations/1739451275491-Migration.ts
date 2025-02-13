import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739451275491 implements MigrationInterface {
  name = 'Migration1739451275491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'admin', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coupon-checks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "is_valid" boolean NOT NULL DEFAULT false, "couponRuleId" uuid, CONSTRAINT "PK_7337b321a871bb4ed68f6495e95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."coupon-rules_type_enum" AS ENUM('FECHO', 'PAIPAIR', 'FECHOPAIR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "coupon-rules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."coupon-rules_type_enum" NOT NULL, "parameters" json NOT NULL, "created_at" TIMESTAMP NOT NULL, "modified_at" TIMESTAMP NOT NULL, "version" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_6941463f53d1ae9040ff5829d05" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon-checks" ADD CONSTRAINT "FK_83f8b794511b4c0729b1fe89526" FOREIGN KEY ("couponRuleId") REFERENCES "coupon-rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coupon-checks" DROP CONSTRAINT "FK_83f8b794511b4c0729b1fe89526"`,
    );
    await queryRunner.query(`DROP TABLE "coupon-rules"`);
    await queryRunner.query(`DROP TYPE "public"."coupon-rules_type_enum"`);
    await queryRunner.query(`DROP TABLE "coupon-checks"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
