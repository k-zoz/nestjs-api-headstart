import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;


    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    staffIdNumber?: string
}