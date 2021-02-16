import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { environment } from 'environments/environment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GapiService {
  authInstance: gapi.auth2.GoogleAuth;

  constructor() {
    this.initGoogleAuth();
  }


  private async initGoogleAuth(): Promise<void> {
    const payload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    try {
      await payload;
      const auth = await gapi.auth2.init({
        client_id:
          `${environment.apiKey}.apps.googleusercontent.com`,
      });
      this.authInstance = auth;
    } catch (error) {
      console.warn('error: ', error);
    }
  }

  async getUser(): Promise<User> {
    try {
      const user = await this.authInstance.signIn();
      const profile = user.getBasicProfile();

      return {
        id: profile.getId(),
        givenName: profile.getGivenName(),
        familyName: profile.getFamilyName(),
        imageUrl: profile.getImageUrl(),
        email: profile.getEmail(),
      };

    } catch (error) {
      throw error;
    }
  }
}
