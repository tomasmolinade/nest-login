import { Module } from '@nestjs/common';
import { CreateAccountController } from './create-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LogInGuard } from './guards/login.guard';
import { AuthRoutesProvider } from './auth-routes.service';
import { UserModule } from 'src/user/user.module';
import { JWTService } from './JWT.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
    controllers: [CreateAccountController, LoginController],
    providers: [LogInGuard, AuthRoutesProvider, JWTService, AuthGuard, RolesGuard],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET! ,
            signOptions: { expiresIn: '1h' },
        }),
        UserModule,
    ],
    exports: [AuthGuard, JwtModule, RolesGuard],
})
export class AuthModule {}
