import * as faker from 'faker';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GapiService } from '@core/services/gapi/gapi.service';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { SetUser, UserState } from '@store/user';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@core/models/user';

const userStub: User = {
  id: faker.random.number().toString(),
  givenName: faker.name.firstName(),
  familyName: faker.name.lastName(),
  imageUrl: faker.image.avatar(),
  email: faker.internet.email(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  let router: Router;
  let gapiService: GapiService;

  const gapiServiceStub = {
    getUser: () => Promise.resolve(userStub),
  };

  const routerSpy = {
    navigate: jasmine.createSpy('navigate'),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([UserState]),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        LoginComponent,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: GapiService, useValue: gapiServiceStub },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    gapiService = TestBed.inject(GapiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch with user response', async () => {
    const spy = spyOn(store, 'dispatch');
    await component.authenticate();
    expect(spy).toHaveBeenCalledWith(new SetUser(userStub));
  });

  it('should put to store user', async () => {
    const userBefore = store.selectSnapshot(state => state.user);
    expect(userBefore).toBe(null);
    await component.authenticate();
    const user = store.selectSnapshot(state => state.user);
    expect(user).toEqual(userStub);
  });

  it('should call navigate to details after authentication', async () => {
    await component.authenticate();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/details']);
  });
});
