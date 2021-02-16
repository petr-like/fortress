import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

// Models
import { User } from '@core/models/user';

// Actions
import { LoginUser, RemoveUser } from './user.actions';
import { GapiService } from '@core/services/gapi/gapi.service';

@State<User>({
  name: 'user',
  defaults: null,
})

@Injectable()
export class UserState {

  constructor(
    private gapi: GapiService,
  ) {}

  @Action(LoginUser)
  async loginUser({ setState }: StateContext<User>): Promise<void> {
    const user = await this.gapi.getUser();
    setState(user);
  }

  @Action(RemoveUser)
  removeUser({ setState }: StateContext<User>): void {
    setState(null);
  }
}
