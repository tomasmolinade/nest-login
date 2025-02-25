import { Controller, Get } from '@nestjs/common';
import { RoutesProvider } from './routes';

@Controller()
export class RoutesController {
    constructor(private readonly routesProvider: RoutesProvider) {}

    @Get()
    async getRoot() {
        return await this.routesProvider.getRoot();
    }

    @Get('create-account')
    async getCreateAccount() {
        return await this.routesProvider.getCreateAccount();
    }

    @Get('webpage')
    async getWebpage() {
        return await this.routesProvider.getWebpage();
    }
}
