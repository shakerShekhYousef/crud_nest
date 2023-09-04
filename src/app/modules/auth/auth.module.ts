import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelpersModule } from "../../helpers/helpers.module";
import { AclModule } from "./../acl/acl.module";
import { UserModule } from "./../user/user.module";
import { AuthController } from "./controllers/auth.controller";
import { WebAuthController } from "./controllers/auth.web.controller";
import { AuthStat } from "./entities/authStat.entity";
import { AuthService } from "./services/auth.service";
import { AuthStatService } from "./services/authStat.service";
import { JwtModule } from "@nestjs/jwt";
import { ENV } from "@src/env";
import { JwtStrategy } from "@src/app/strategies";
import { PassportModule } from "@nestjs/passport";

const entities = [AuthStat];
const services = [AuthStatService, AuthService];
const subscribers = [];
const controllers = [AuthController];
const webControllers = [WebAuthController];
const modules = [HelpersModule, UserModule, AclModule];
const passport = PassportModule.register({
  defaultStrategy: "jwt",
});
export const jwt = JwtModule.register({
  secret: process.env.JWT_SECRET || ENV.jwt.secret,
  signOptions: {
    expiresIn: ENV.jwt.refreshTokenExpireIn,
  },
});

@Module({
  imports: [TypeOrmModule.forFeature(entities), ...modules, jwt, passport],
  providers: [...services, ...subscribers, JwtStrategy],
  exports: [...services, ...subscribers, JwtStrategy, PassportModule],
  controllers: [...controllers, ...webControllers],
})
export class AuthModule {}
