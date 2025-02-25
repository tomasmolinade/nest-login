import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccount } from './create-account';

describe('CreateAccount', () => {
    let provider: CreateAccount;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateAccount],
        }).compile();

        provider = module.get<CreateAccount>(CreateAccount);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
