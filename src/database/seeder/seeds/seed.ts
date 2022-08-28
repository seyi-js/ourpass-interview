import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../../modules/user/entity/user.entity';
import { Post } from '../../../modules/post/entity/post-entity';
import { Category } from '../../../modules/category/entity/category.entity';

// ...

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = await factory(User)().createMany(1);

    const categories = await factory(Category)()
      .map(async (category) => {
        category.owner = users[Math.floor(Math.random() * users.length)];

        return category;
      })
      .createMany(15);

    await factory(Post)()
      .map(async (post) => {
        post.owner = users[Math.floor(Math.random() * users.length)];
        post.category =
          categories[Math.floor(Math.random() * categories.length)];

        return post;
      })
      .createMany(15);
  }
}
