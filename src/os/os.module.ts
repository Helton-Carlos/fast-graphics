import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OsService } from './os.service';
import { OsController } from './os.controller';
import { OS } from './entities/os.entity';
import { UserModule } from '../user/user.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([OS]), UserModule, ClientModule],
  controllers: [OsController],
  providers: [OsService],
})
export class OsModule {}
