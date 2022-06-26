import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT),
    database: process.env.DB_USER,
    username: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    autoLoadEntities: true,
    synchronize: true, // never true in production!
  }),
  UserModule]
})
export class AppModule {}
