import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User } from '../../../modules/user/entity/user.entity';

define(User, () => {
  const user = new User();

  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = 'tester@gmail.com';
  user.password = 'password';
  return user;
});
