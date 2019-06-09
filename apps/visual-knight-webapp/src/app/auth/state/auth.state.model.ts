import { User } from '../../models/user.model';
import { INVITATION_STATE } from '../auth.service';

export class AuthStateModel {
  isAuthenticated: boolean;
  userPictures: {
    profilePicture: string;
    profilePictureBig: string;
  };
  user: User;
  invitationState: INVITATION_STATE;
}
