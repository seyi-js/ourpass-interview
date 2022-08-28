import { IUser } from '../../user/interface';

export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  owner?: string | IUser;
}
