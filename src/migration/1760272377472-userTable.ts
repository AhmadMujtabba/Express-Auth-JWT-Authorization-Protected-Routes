import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1760272377472 implements MigrationInterface {
    name = 'UserTable1760272377472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_table" ADD "otp" integer`);
        await queryRunner.query(`ALTER TABLE "user_table" ADD "otp_expiry" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_table" DROP COLUMN "otp_expiry"`);
        await queryRunner.query(`ALTER TABLE "user_table" DROP COLUMN "otp"`);
    }

}
