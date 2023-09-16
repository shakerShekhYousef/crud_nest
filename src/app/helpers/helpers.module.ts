import { QueryHelper } from "./query.helper";
import { Module } from "@nestjs/common";
import { BcryptHelper } from "./bcrypt.helper";
import { JWTHelper } from "./jwt.helper";
import { FileHelper } from "./file.helper";

const HELPERS = [BcryptHelper, JWTHelper, QueryHelper, FileHelper];

@Module({
  providers: [...HELPERS],
  exports: [...HELPERS],
})
export class HelpersModule {}
