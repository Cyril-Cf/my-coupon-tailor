import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739455146271 implements MigrationInterface {
    name = 'Migration1739455146271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coupon_rule_dependencies" ("rule_id" uuid NOT NULL, "dependency_id" uuid NOT NULL, CONSTRAINT "PK_f6dd81b1d4351f0968d292cc1fa" PRIMARY KEY ("rule_id", "dependency_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b59d3b37f5818f4b551151827d" ON "coupon_rule_dependencies" ("rule_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3ef0354b3af9242c1cffa7cb0" ON "coupon_rule_dependencies" ("dependency_id") `);
        await queryRunner.query(`ALTER TABLE "coupon_rule_dependencies" ADD CONSTRAINT "FK_b59d3b37f5818f4b551151827da" FOREIGN KEY ("rule_id") REFERENCES "coupon-rules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coupon_rule_dependencies" ADD CONSTRAINT "FK_e3ef0354b3af9242c1cffa7cb0e" FOREIGN KEY ("dependency_id") REFERENCES "coupon-rules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon_rule_dependencies" DROP CONSTRAINT "FK_e3ef0354b3af9242c1cffa7cb0e"`);
        await queryRunner.query(`ALTER TABLE "coupon_rule_dependencies" DROP CONSTRAINT "FK_b59d3b37f5818f4b551151827da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3ef0354b3af9242c1cffa7cb0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b59d3b37f5818f4b551151827d"`);
        await queryRunner.query(`DROP TABLE "coupon_rule_dependencies"`);
    }

}
