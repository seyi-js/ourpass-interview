import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Category } from '../../../modules/category/entity/category.entity';

define(Category, () => {
  const category = new Category();

  (category.name = faker.word.noun(8)),
    (category.description = faker.lorem.paragraph(1));
  return category;
});
