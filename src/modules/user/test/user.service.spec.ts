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

  let userId: number;

  describe('create', () => {
    it('should create a user', async () => {
      const payload = newUser;

      const result = await service.create(payload);

      expect(result.email).toEqual(payload.email);
      expect(result.password).not.toEqual(payload.password);

      userId = result.id;
    });
  });

  describe('find', () => {
    it('should find many users', async () => {
      const result = await service.find({});

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('should update a user profile', async () => {
      const result = await service.update(userId, { firstName: 'Samuel' });

      expect(result.firstName).toEqual('Samuel');
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const { email, password } = newUser;

      const result = await service.login(email, password);

      expect(result).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const res = await service.delete(userId);

      expect(res).toBeFalsy();
    });
  });
});
