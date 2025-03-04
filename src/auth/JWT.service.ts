import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    async setSessionCookie(user: User, res): Promise<void> {
        const payload = { userId: user.id
        , username: user.username };
        
        const token =  this.jwtService.sign(payload);

        res.cookie('jwt', token, {
            httpOnly: true, 
            secure: false, 
            sameSite: 'strict', 
            maxAge: 3600 * 1000, // 1 hour 
        });
    }
}
