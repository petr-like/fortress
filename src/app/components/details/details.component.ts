import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

// Models
import { User } from '@core/models/user';

// Store
import { RemoveUser, UserState } from '@store/user';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})

export class DetailsComponent {
  @Select(UserState) user$: Observable<User>;

  constructor(
    private store: Store,
    private route: Router,
  ) {}

  async goBack(): Promise<void> {
    try {
      await this.store.dispatch(new RemoveUser()).toPromise();
      this.route.navigate(['/']);
    } catch (error) {}
  }
}
