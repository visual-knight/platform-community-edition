import { Injectable } from '@angular/core';
import { UserType, UserlistGQL } from '../../core/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userlistGQL: UserlistGQL) {}

  setNewPassword(value: string) {
    throw new Error('Method not implemented.');
  }
  updateProfile(value: { email: string; forename: string; lastname: string }) {
    throw new Error('Method not implemented.');
  }
  resendVerificationEmail() {
    throw new Error('Method not implemented.');
  }

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
