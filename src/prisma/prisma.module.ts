import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //global decorator to make the module accessible to other features of the projects
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //export as well to make it accessible to others
})
export class PrismaModule { }

