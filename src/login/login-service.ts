import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async logIn(data: LogInDTO) {
        const existingUser = await this.userRepository.findOne({
            where: { username: data.username, password: data.password },
        });
        if (!existingUser) {
            return { status: false, message: 'Wrong username or password!' };
        }
        return { status: true };
    }

    async generateToken(user: Partial<User>): Promise<string> {
        const payload = { userId: user.id, username: user.username };

        return this.jwtService.sign(payload);
    }

    async validateToken(cookie: string)
    {
    try {
        // Verify and decode the JWT token
        const payload = await this.jwtService.verifyAsync(cookie);
        return payload;
        } catch (error) {
        throw new UnauthorizedException('Invalid token');
        }
    }
}
