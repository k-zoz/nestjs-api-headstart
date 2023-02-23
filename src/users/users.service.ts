import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    //========edit user======//
    async editUser(userID: any, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id: userID
            },
            data: {
                ...dto, //retun anything in the dto data
            }
        })
        delete user.password
        return user
    }




}
