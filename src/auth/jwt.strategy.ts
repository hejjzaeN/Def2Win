import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AccessLevel } from "src/const/db";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private userService: UserService) {
        super({
            secretOrKey: process.env.JWT_SECRET_KEY,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate (payLoad: any) {
        const user = await this.userService.read(payLoad.sub)

        return {
            id: user.id,
            firstname: user.firstname,
            surname: user.surname,
            accessLevel: user.accessLevel
        }
    }
}