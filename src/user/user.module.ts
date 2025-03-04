import { Module } from '@nestjs/common';
import { UserLogInService } from './user-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
    providers: [UserLogInService],
    exports: [UserLogInService],
    imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
