/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto, AuthLoginDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config/dist";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { } //dependency injection of the prisma service

    //user signs in
    async signIn(dto: AuthLoginDto) {

        //first find by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        //if user does not exist throw exception/error,  throw guard error
        if (!user) throw new ForbiddenException("Incorrect email or password")

        //compare password 
        //first argument is the password saved with the email when signing up, second argument is the passowrd entered while trying to sign in
        const matchingPassword = await argon.verify(user.password, dto.password)
        //if password incorrect throw an error/exception
        if (!matchingPassword) throw new ForbiddenException("Incorrect email or password")


        //if everything else okay return user
        // delete user.password
        return this.signToken(user.id, user.email)
    }

    async signUp(dto: AuthDto) {

        //generate the hash using the argon npm library
        const hash = await argon.hash(dto.password)

        try {
            //save the user to the database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    staffIdNumber: dto.staffIdNumber
                }
                // }, select: {
                //     id: true,
                //     email: true,
                //     staffIdNumber: true, 
                // }   
            })
            return this.signToken(user.id, user.email)

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials Taken")
                }
            }
            throw error
        }


    }



    //generate an access token
    async signToken(userID: number | string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userID,
            email
        }
        const lifeTime = this.config.get('JWT_LIFETIME')
        const secretKey = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, { expiresIn: lifeTime, secret: secretKey })


        return {
            access_token: token
        }
        // return 
    }
}