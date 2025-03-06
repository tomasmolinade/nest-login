import { Module } from '@nestjs/common';
import { WebpageUserController } from './webpage.user.controller';
import { WebpageRoutesProvider } from './webpage-routes.service';
import { AuthModule } from 'src/auth/auth.module';
import { WebpageAdminController } from './webpage.admin.controller';

@Module({
    controllers: [WebpageUserController, WebpageAdminController],
    providers: [WebpageRoutesProvider],
    exports: [],
    imports: [AuthModule],
})
export class WebpageModule {}
