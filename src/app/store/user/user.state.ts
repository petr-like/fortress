import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

// Models
import { User } from '@core/models/user';

// Actions
import { RemoveUser, SetUser } from './user.actions';


@State<User>({
  name: 'user',
  defaults: null,
})

@Injectable()
export class UserState {
  @Action(SetUser)
  setUser({ setState }: StateContext<User>, { user }: SetUser): void {
    setState(user);
  }

  @Action(RemoveUser)
  removeUser({ setState }: StateContext<User>): void {
    setState(null);
  }
}
