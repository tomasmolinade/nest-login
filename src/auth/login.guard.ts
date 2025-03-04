import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LogInGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Casting to include cookies explicitly
        const request = context.switchToHttp().getRequest() as Request & {
            cookies: Record<string, any>;
        } & { username: string };
        // console.log('Cookies in guard:', request.cookies); // Should log the parsed cookies object
        const jwt = request.cookies['jwt'];

        try {
            // Verify and decode the JWT token
            const payload = await this.jwtService.verifyAsync(jwt);
            // console.log(payload)
            request.username = payload.username;
            return true;
        } catch (error) {
            return false;
        }
    }
}
