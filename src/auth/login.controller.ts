import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LogInDTO } from './dto/login.dto';
import { Request } from 'express';
import { LogInGuard } from './guards/login.guard';
import { AuthRoutesProvider } from './auth-routes.service';
import { UserLogInService } from 'src/user/user-login.service';
import { JWTService } from './JWT.service';

@Controller()
export class LoginController {
    constructor(
        private readonly userLogInService: UserLogInService,
        private readonly routesProvider: AuthRoutesProvider,
        private readonly jWTService: JWTService,
    ) {}

    @Get()
    async getRoot() {
        return await this.routesProvider.getRoot();
    }

    @Post('login')
    async logIn(
        @Body() data: LogInDTO,
        @Res({ passthrough: true }) res: Response,
    ) {
        const auth = await this.userLogInService.logIn(data);
        if (!auth.status) {
            return { status: false, message: 'Wrong username or password!' };
        }

        await this.jWTService.setSessionCookie(auth.user!, res);

        return {
            status: true,
            message: 'Logged in successfully',
            redirect: auth.user!.role === 'user' ? 'webpage' : 'admin',
        };
    }
}
