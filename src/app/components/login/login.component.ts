import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '@core/models/user';
import { SetUser } from '@store/actions/user.actions';

declare var gapi: any;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  public gapiSetup = false;
  public authInstance: gapi.auth2.GoogleAuth;
  public user: gapi.auth2.GoogleUser;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.initGoogleAuth();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async initGoogleAuth(): Promise<void> {
    const payload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    try {
      await payload;
      const auth = await gapi.auth2.init({
        client_id:
          '440505648402-6hjj0acgiblc6ue49heii6clpk1rai94.apps.googleusercontent.com',
      });
      this.gapiSetup = true;
      this.authInstance = auth;
    } catch (error) {
      console.warn('error: ', error);
    }
  }

  async authenticate(): Promise<void> {
    try {
      const user = await this.authInstance.signIn();
      const profile = user.getBasicProfile();
      const payload: User = {
        id: profile.getId(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail(),
      };

      this.store.dispatch(new SetUser(payload))
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(
          () => this.router.navigateByUrl('/details'),
        );
    } catch (error) {
      console.warn('error: ', error);
    }
  }
}
