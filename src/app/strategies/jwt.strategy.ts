import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../modules/user/entities/user.entity";
import { ENV } from "@src/env";
import { AuthService } from "../modules/auth/services/auth.service";
import { UserService } from "../modules/user/services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ENV.jwt.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user_auth = await this.userService.findOne({
      where: { id: payload.user.id },
    });
    const user = await this.authService.validateUser(
      user_auth.email,
    );
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
