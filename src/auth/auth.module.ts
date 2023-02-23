/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";


@Module({
    imports: [JwtModule.register({})], // import the jwt module to the auth module for tokens and jwt, as it's a module it also has a service
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {


}
