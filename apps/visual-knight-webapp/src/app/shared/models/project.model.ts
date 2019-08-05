import { User } from './user.model';
export class Project {
  public id: string;
  public _testsMeta: { count: number } = {
    count: 0
  };
  public users: User[];
  public background: string;

  constructor(public name: string, public description: string) {}
}
