import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WebpageModule } from './webpage/webpage.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'public'),
        }),
        // TypeOrmModule.forRoot({
        //     type: 'postgres', // database type
        //     host: "localhost",
        //     port: 25000,
        //     username: "postgres",
        //     password: "tec123", 
        //     database: "Docker",
        //     entities: [User], //[process.cwd() + '/entities/*.entity{.ts,.js}'],
        //     synchronize: false, // set to false in production!
        // }),
        TypeOrmModule.forRoot({
    type: 'postgres', // database type
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [User], //[process.cwd() + '/entities/*.entity{.ts,.js}'],
    synchronize: false, // set to false in production!
}),
        UserModule,
        AuthModule,
        WebpageModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}




// TypeOrmModule.forRoot({
//     type: 'postgres', // database type
//     host: process.env.POSTGRES_HOST,
//     port: process.env.POSTGRES_PORT
//          ? parseInt(process.env.POSTGRES_PORT, 10)
//          : 5433,
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DATABASE,
//     entities: [User], //[process.cwd() + '/entities/*.entity{.ts,.js}'],
//     synchronize: true, // set to false in production!
// }),