import { User } from '../shared/user';
import { Appearance } from '../shared/appearance';

export interface Superfrog {
   user?: User,
   phone?: string,
   appearances?: number[],
}