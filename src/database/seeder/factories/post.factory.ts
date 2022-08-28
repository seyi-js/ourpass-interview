import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import {} from '../../../modules/category/entity/category.entity';
import { Post } from '../../../modules/post/entity/post-entity';

define(Post, () => {
  const post = new Post();

  (post.title = faker.word.noun(8)),
    (post.description = faker.lorem.paragraph(1));
  return post;
});
