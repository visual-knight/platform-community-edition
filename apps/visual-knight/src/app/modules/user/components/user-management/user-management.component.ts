import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserType } from '../../../core/types';
import { UsersDataSource } from './users.datasource';

@Component({
  selector: 'visual-knight-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @Input() users$: Observable<UserType[]>;
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<UserType>();
  @Output() resendInvitation = new EventEmitter<UserType>();
  public displayedColumns = ['name', 'email', 'role', 'state', 'actions'];
  public dataSource: UsersDataSource;
  public newUserForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.dataSource = new UsersDataSource(this.users$);
    this.newUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmitNewUser() {
    if (this.newUserForm.valid) {
      this.add.emit(this.newUserForm.value.email);
      this.newUserForm.reset();
    }
  }

  onDeleteUser(user: UserType) {
    this.remove.emit(user);
  }

  onResendInvitation(user: UserType) {
    this.resendInvitation.emit(user);
  }
}
