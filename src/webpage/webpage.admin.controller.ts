import { Controller, Get, UseGuards } from '@nestjs/common';
import { WebpageRoutesProvider } from './webpage-routes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class WebpageAdminController {
    constructor(private readonly routesProvider: WebpageRoutesProvider) {}

    @Roles("admin")
    @Get()
    async getAdmin() {
        return await this.routesProvider.getAdmin();
    }
}
