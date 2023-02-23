import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey: config.get(`JWT_SECRET`)
        })
    }

    async validate(payload: { sub: any, email: string }) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        delete user.password /// delete the user password from the database object. so as to prevent sending hash to the client
        return user
    }
}