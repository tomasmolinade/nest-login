import { Controller, Post, Body } from '@nestjs/common';
import { CreateAccountDTO } from './dto/create-account.dto';
import { CreateAccount } from './create-account';

@Controller('create-account')
export class CreateAccountController {
    constructor(private readonly createAccountProvider: CreateAccount) {}

    @Post()
    postUser(@Body() newUserData: CreateAccountDTO) {
        // console.log(newUserData);
        return this.createAccountProvider.createAccount(newUserData);
    }
}
