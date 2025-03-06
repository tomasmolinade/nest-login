import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class AuthRoutesProvider {
    async getRoot() {
        return await fs.readFile('./public/html/index.html', 'utf-8');
    }

    async getCreateAccount() {
        return await fs.readFile('./public/html/create-account.html', 'utf-8');
    }
}
