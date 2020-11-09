import { User } from '@core/models/user';

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public user: User) {}
}
export class RemoveUser {
  static readonly type = '[User] Remove';
  constructor(public user: User) {}
}

