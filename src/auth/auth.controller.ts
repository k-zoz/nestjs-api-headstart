/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { AuthService } from "./auth.service";
import { AuthDto, AuthLoginDto } from "./dto"; //dependency injection from nestjs


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    //Sign In
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() dto: AuthLoginDto) {
        return this.authService.signIn(dto)
    }

    //Sign Up
    @Post("signup")
    signUp(@Body() dto: AuthDto) { //@Body() decorator to get access to the req.body, this is an express framework
        return this.authService.signUp(dto)
    }
}