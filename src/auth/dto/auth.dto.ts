import { IsEmail, IsNotEmpty, IsString } from "class-validator";
// import { IsNotEmpty, IsString } from "class-validator/types/decorator/decorators";



export class AuthDto {
  @IsEmail()  // after installing class validator & class transformer packagges. Use these pipes for validation, 
  @IsNotEmpty() // then set nestjs in the maints file to use the validation pipe globally
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  staffIdNumber: string
}


//dto for Login/Signing  in
export class AuthLoginDto {
  @IsEmail()  // after installing class validator & class transformer packagges. Use these pipes for validation, 
  @IsNotEmpty() // then set nestjs in the maints file to use the validation pipe globally
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}