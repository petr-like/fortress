import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DetailsComponent } from './details.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { RemoveUser, UserState } from '@store/user';
import { RouterTestingModule } from '@angular/router/testing';


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: Store;
  let router: Router;

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
        DetailsComponent,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch for remove user', async () => {
    const spy = spyOn(store, 'dispatch');
    await component.goBack();
    expect(spy).toHaveBeenCalledWith(new RemoveUser());
  });

  it('user must be null', async () => {
    await component.goBack();
    const user = store.selectSnapshot(state => state.user);
    expect(user).toBe(null);
  });

  it('should call router navigate to home page', async () => {
    await component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
