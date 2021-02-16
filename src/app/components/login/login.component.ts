import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

// Store
import { LoginUser } from '@store/user';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  async authenticate(): Promise<void> {
    try {
      await this.store.dispatch(new LoginUser()).toPromise();
      this.router.navigate(['/details']);
    } catch (e) {
      console.warn(e);
    }
  }
}
