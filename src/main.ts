import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());


    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();




// console.log(`type: 'postgres', // database type
//     host: ${process.env.POSTGRES_HOST},
//     port: ${parseInt(process.env.POSTGRES_PORT!, 10)},
//     username: ${process.env.POSTGRES_USER},
//     password: ${process.env.POSTGRES_PASSWORD},
//     database: ${process.env.POSTGRES_DATABASE},`)