import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

// Store
import { SetUser } from '@store/user';

// Services
import { GapiService } from '@core/services/gapi/gapi.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {

  constructor(
    private store: Store,
    private router: Router,
    private gapiService: GapiService,
  ) {}

  async authenticate(): Promise<void> {
    try {
      const user = await this.gapiService.getUser();
      await this.store.dispatch(new SetUser(user)).toPromise();
      this.router.navigate(['/details']);
    } catch (e) {}
  }
}
