import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoutesModule } from './routes/routes.module';
import { CreateAccountModule } from './create-account/create-account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { LoginModule } from './login/login.module';

@Module({
    imports: [
        RoutesModule,
        CreateAccountModule,
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'public'),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres', // database type
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT
                ? parseInt(process.env.POSTGRES_PORT, 10)
                : 5433,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [User], //[process.cwd() + '/entities/*.entity{.ts,.js}'],
            synchronize: true, // set to false in production!
        }),
        LoginModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
