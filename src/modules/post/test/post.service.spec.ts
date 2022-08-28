import { TestingModule, Test } from '@nestjs/testing';
import { AppModuleSpec } from '../../../app.module.spec';
import { IUser } from '../../user/interface';
import { newUser } from '../../user/test/stub';
import { UserService } from '../../user/user.service';
import { CategoryService } from '../../category/category.service';
import { PostService } from '../post.service';

describe('PostService', () => {
  let service: PostService;
  let categoryService: CategoryService;
  let userService: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModuleSpec],
    }).compile();

    service = module.get<PostService>(PostService);
    categoryService = module.get<CategoryService>(CategoryService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let id: number;
  let user: IUser;

  describe('create', () => {
    it('should create a post', async () => {
      user = await userService.create(newUser);

      const category = await categoryService.create({
        name: 'test',
        owner: user.id,
        description: 'new category',
      });

      const post = await service.create({
        title: 'a test post',
        description: 'test',
        owner: user.id,
        category: category.id,
      });

      expect(post.title).toBe('a test post');
    });
  });

  describe('find', () => {
    it('should list all posts', async () => {
      const result = await service.find({});

      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const result = await service.update(id, user, {
        title: 'post 1 updated',
      });

      expect(result.title).toEqual('post 1 updated');
    });
  });

  describe('findOne', () => {
    it('should find a post', async () => {
      const result = await service.findOne({ id, owner: user.id });

      expect(result).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      const res = await service.delete(id, user);

      expect(res).toBeFalsy();
    });
  });
});
