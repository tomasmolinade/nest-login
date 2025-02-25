import { Test, TestingModule } from '@nestjs/testing';
import { Routes } from './routes';

describe('Routes', () => {
    let provider: Routes;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Routes],
        }).compile();

        provider = module.get<Routes>(Routes);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
