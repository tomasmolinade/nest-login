import { Module } from '@nestjs/common';
import { CreateAccountController } from './create-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LogInGuard } from './login.guard';
import { RoutesProvider } from './routes.service';
import { UserModule } from 'src/user/user.module';
import { JWTService } from './JWT.service';

@Module({
    controllers: [CreateAccountController, LoginController],
    providers: [LogInGuard, RoutesProvider, JWTService],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
        UserModule,
    ],
})
export class AuthModule {}
