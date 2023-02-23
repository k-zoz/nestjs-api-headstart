/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                }
            }
        })

    }

    //clean db is the tear down logic to clean the database
    cleanDb() {
        // transactions in prisma is telling prisma to carry out the command exactly how it is stated
        return this.$transaction([
            this.story.deleteMany(),
            this.user.deleteMany()
        ])
    }
}
