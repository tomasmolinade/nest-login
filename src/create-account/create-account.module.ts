import { Module } from '@nestjs/common';
import { CreateAccountController } from './create-account.controller';
import { CreateAccount } from './create-account';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';

@Module({
    controllers: [CreateAccountController],
    providers: [CreateAccount],
    imports: [TypeOrmModule.forFeature([User])],
})
export class CreateAccountModule {}
