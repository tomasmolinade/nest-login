import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class WebpageRoutesProvider {
    async getWebpage() {
        return await fs.readFile('./public/html/webpage.html', 'utf-8');
    }

    async getAdmin() {
        return await fs.readFile('./public/html/admin.html', 'utf-8');
    }
}
