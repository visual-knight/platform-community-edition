import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      imports: [
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        RouterTestingModule,
        ApolloTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
