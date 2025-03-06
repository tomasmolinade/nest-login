import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { WebpageRoutesProvider } from './webpage-routes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';


@UseGuards(AuthGuard, RolesGuard)
@Controller('webpage')
export class WebpageUserController {
    constructor(private readonly routesProvider: WebpageRoutesProvider) {}

    @Roles("user")
    @Get()
    async getWebpage() {
        return await this.routesProvider.getWebpage();
    }

    @Roles("user")
    @Get("info")
    async getInfo(@Req() r :Request & {sessionInfo: Object} )
    {
        // console.log(r.sessionInfo!);
        return r.sessionInfo
    }
}
