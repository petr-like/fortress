import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { User } from '@core/models/user';
import { RemoveUser, SetUser } from '@store/actions/user.actions';

export class UserStateModel {
  user: User;
}

@State<User>({
  name: 'user',
  defaults: null,
})
@Injectable()
export class UserState {
  @Selector()
  static getUser(state: UserStateModel): User {
    return state.user;
  }

  @Action(SetUser)
  updateUser({ setState }: StateContext<User>, { user }: SetUser): void {
    setState(user);
  }

  @Action(RemoveUser)
  removeUser({ setState }: StateContext<User>): void {
    setState(null);
  }
}
