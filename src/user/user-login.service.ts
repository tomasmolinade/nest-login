import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
// import { CreateAccountDTO } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UserLogInService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createAccount(data: Partial<User>) {
        const existingUser = await this.userRepository.findOne({
            where: { username: data.username },
        });

        if (existingUser) {
            throw new ConflictException(
                'A user with this username already exists.',
            );
        }
        const existingEmail = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (existingEmail) {
            throw new ConflictException(
                'A user with this email already exists.',
            );
        }
        data.role = 'user';
        const user = this.userRepository.create(data);
        const insert = await this.userRepository.save(user);

        // console.log({status: true, data: x});
        return { status: true, data: insert };
    }

    async logIn(data: LogInDTO) {
        const existingUser = await this.userRepository.findOne({
            where: { username: data.username, password: data.password },
        });
        if (!existingUser) {
            return { status: false };
        }
        return { status: true, user: existingUser };
    }
}
