import { ICategory } from '../../category/interface';
import { IUser } from '../../user/interface';

export interface IPost {
  id?: number;
  title?: string;
  description?: string;
  owner?: number | IUser;
  category?: number | ICategory;
}
