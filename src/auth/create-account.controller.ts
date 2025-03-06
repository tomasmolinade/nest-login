import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateAccountDTO } from './dto/create-account.dto';
import { AuthRoutesProvider } from './auth-routes.service';
import { UserLogInService } from 'src/user/user-login.service';

@Controller('create-account')
export class CreateAccountController {
    constructor(
        private readonly userLogInService: UserLogInService,
        private readonly routesProvider: AuthRoutesProvider,
    ) {}

    @Get()
    async getCreateAccount() {
        return await this.routesProvider.getCreateAccount();
    }

    @Post()
    postUser(@Body() newUserData: CreateAccountDTO) {
        return this.userLogInService.createAccount(newUserData);
    }
}
