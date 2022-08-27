import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { newUser } from './stub';
import { AppModuleSpec } from '../../../app.module.spec';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModuleSpec],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const payload = newUser;

      const result = await service.create(payload);

      expect(result.email).toEqual(payload.email);
      expect(result.password).not.toEqual(payload.password);
    });
  });
});
