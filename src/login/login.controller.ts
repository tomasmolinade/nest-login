import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login-service';
import { LogInDTO } from './dto/login.dto';
import { Request } from 'express';
import { LogInGuard } from './login.guard';


@Controller('login')
export class LoginController {
    constructor(private readonly logInService: LoginService) {}

    @Post()
    async logIn(
        @Body() data: LogInDTO,
        @Res({ passthrough: true }) res: Response,
    ) {
        const auth = await this.logInService.logIn(data);
        if (!auth.status) {
            return auth;
        }

        // Generate JWT; assume your service now returns a token along with auth info.
        const token = await this.logInService.generateToken(data);

        // Set the JWT as an HttpOnly cookie
        res.cookie('jwt', token, {
            httpOnly: true, // Cookie not accessible via client-side JavaScript
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Adjust based on your cross-site requirements
            maxAge: 3600 * 1000, // 1 hour expiration
        });

        return { status: true, message: 'Logged in successfully' };
    }

    @Get('info')
    @UseGuards(LogInGuard)
    async getInfo(@Req() req: Request & {username : string}) {
        return {username: req.username}
    }
}
