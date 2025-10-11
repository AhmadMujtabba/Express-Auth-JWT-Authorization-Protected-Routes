import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1760193558893 implements MigrationInterface {
    name = 'UserTable1760193558893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_table_role_enum" AS ENUM('admin', 'staff')`);
        await queryRunner.query(`CREATE TABLE "user_table" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."user_table_role_enum" NOT NULL DEFAULT 'staff', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "verification_status" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_517f1a649ad49fa1435e54b0d5f" UNIQUE ("email"), CONSTRAINT "PK_1e3ed533dd87e54f8de2a912187" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_table"`);
        await queryRunner.query(`DROP TYPE "public"."user_table_role_enum"`);
    }

}
