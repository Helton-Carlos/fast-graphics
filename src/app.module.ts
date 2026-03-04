import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OsModule } from './os/os.module';
import { ClientModule } from './client/client.module';
import { User } from './user/entities/user.entity';
import { OS } from './os/entities/os.entity';
import { Client } from './client/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'fast_graphics',
      entities: [User, OS, Client],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    UserModule,
    AuthModule,
    ClientModule,
    OsModule,
  ],
})
export class AppModule {}
