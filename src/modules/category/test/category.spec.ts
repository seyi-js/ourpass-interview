import { TestingModule, Test } from '@nestjs/testing';
import { AppModuleSpec } from '../../../test.module';
import { IUser } from '../../user/interface';
import { newUser } from '../../user/test/stub';
import { UserService } from '../../user/user.service';
import { CategoryService } from '../category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let userService: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModuleSpec],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let id: number;
  let user: IUser;

  describe('create', () => {
    it('should create a category', async () => {
      user = await userService.create(newUser);

      const category = await service.create({
        name: 'Category 1',
        description: 'Category 1 description',
        owner: user.id,
      });

      expect(category).toBeDefined();

      id = category.id;
    });
  });

  describe('find', () => {
    it('should list all categories', async () => {
      const result = await service.find({});

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const result = await service.update(id, user, {
        name: 'Category 1 updated',
      });

      expect(result.name).toEqual('Category 1 updated');
    });
  });

  describe('findOne', () => {
    it('should find a category', async () => {
      const result = await service.findOne({ id, owner: { id: user.id } });

      expect(result).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const res = await service.delete(id, user);

      expect(res).toBeFalsy();
    });
  });
});
