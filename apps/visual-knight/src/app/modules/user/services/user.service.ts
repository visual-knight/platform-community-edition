import { Injectable } from '@angular/core';
import { UserType, UserlistGQL } from '../../core/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  resendVerificationEmail() {
    throw new Error("Method not implemented.");
  }
  constructor(private userlistGQL: UserlistGQL) {}

  resendInvitation(user: UserType) {
    throw new Error('Method not implemented.');
  }
  addUser(email: string) {
    throw new Error('Method not implemented.');
  }
  deleteUser(user: UserType) {
    throw new Error('Method not implemented.');
  }
  getUserList(): Observable<UserType[]> {
    return this.userlistGQL.watch().valueChanges.pipe(map(({ data }) => data.users));
  }
}
