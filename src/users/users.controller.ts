import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user-decorator';
import { EditUserDto } from './dto';
import { UsersService } from './users.service';


@UseGuards(AuthGuard('jwt')) //Guards are used to protect routes from being exposed to unauthorized users. Jwt strategy is used from @nestjs passport strategy
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch()
    editUser(@GetUser('id') userID: any, @Body() dto: EditUserDto) {
        return this.userService.editUser(userID, dto)
    }


}
