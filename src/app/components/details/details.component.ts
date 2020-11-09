import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/user/model';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})

export class DetailsComponent {
  @Select(UserState) user$: Observable<User>;
}
