import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    Length,
} from 'class-validator';

export class CreateAccountDTO {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;
}
