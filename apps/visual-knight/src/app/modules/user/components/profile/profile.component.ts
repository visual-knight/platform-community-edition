import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { vkAnimations } from '../../../shared/animations';
import { UserType } from '../../../core/types';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../core/auth-service.service';
import { map, startWith } from 'rxjs/operators';
import { getGravatarImageHash } from '../../../shared/utils/gravatar';

@Component({
  selector: 'visual-knight-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [vkAnimations]
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserType> = this.authService.user$;
  userNotVerified$: Observable<boolean> = this.user$.pipe(map(user => !user.active));
  userList$: Observable<UserType[]> = this.userService.getUserList();
  userProfilePicture$: Observable<string> = this.user$.pipe(
    startWith({
      email: 'assets/images/avatars/noavatar.png'
    }),
    map(user => getGravatarImageHash(user.email, 200))
  );
  isAdmin$: Observable<boolean> = this.user$.pipe(map(user => user.role === 'ADMIN'));

  public activeTab = 0;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { activeTab: number }) => {
      this.activeTab = data.activeTab;
    });
  }

  copiedValue(value: string) {
    this.snackBar.open(`${value}`, 'Copied', {
      duration: 5000
    });
  }

  onDeleteUser(user: UserType) {
    this.userService.deleteUser(user);
  }

  onAddUser(email: string) {
    this.userService.addUser(email);
  }

  onResendInvitation(user: UserType) {
    this.userService.resendInvitation(user);
  }
}
