import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesProvider } from './routes';

@Module({
    controllers: [RoutesController],
    providers: [RoutesProvider],
})
export class RoutesModule {}
