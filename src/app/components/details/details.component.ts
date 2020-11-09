import { Component } from '@angular/core';
import { User } from '@core/models/user';
import { Select } from '@ngxs/store';
import { UserState } from '@store/state/user.state';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})

export class DetailsComponent {
  @Select(UserState) user$: Observable<User>;
}
