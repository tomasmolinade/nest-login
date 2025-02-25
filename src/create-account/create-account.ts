import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateAccountDTO } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateAccount {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createAccount(data: CreateAccountDTO) {
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
        const user = this.userRepository.create(data);
        const insert = await this.userRepository.save(user);

        // console.log({status: true, data: x});
        return { status: true, data: insert };
    }
}

// const username = data['username'];
// const password = data['password'];
// let connection: any = null;
// try {
//   const select = await connection.query(
//     'SELECT * FROM "Personas" WHERE username = $1',
//     [username],
//   );
//   // console.log(res)
//   if (select.rowCount > 0) {
//     return { status: false, message: 'Username already exixts.' };
//   }

//   // Falta cambair el query con la nueva base de datos
//   const res = await connection.query(
//     'INSERT INTO "Personas" (username, password, hobbie) VALUES ($1,$2,$3)',
//     [username, password],
//   );
//   if (res.rowCount != 1) {
//     throw new InternalServerErrorException();
//   }

//   return { status: true };
// } catch (error) {
//   throw new InternalServerErrorException(
//     'Failed to connect to the database or execute the query',
//   );
// } finally {
//   if (connection !== null) {
//     connection.end();
//   }
// }

// return { status: true };
