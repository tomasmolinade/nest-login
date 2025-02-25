import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LogInGuard } from './login.guard';

@Module({
    controllers: [LoginController],
    providers: [LoginService, LogInGuard],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET ,
            signOptions: { expiresIn: '1h' },
        }),
    ],
})
export class LoginModule {}
