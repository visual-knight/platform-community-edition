import { getActionTypeFromInstance } from '@ngxs/store';
import { Logout, LogoutExpired } from '../auth/state/auth.actions';

export function logoutPlugin(state, action, next) {
  // Use the get action type helper to determine the type
  const actionType = getActionTypeFromInstance(action);
  if (actionType === Logout.type || actionType === LogoutExpired.type) {
    // if we are a logout type, lets erase all the state
    state = { app: state.app };
  }
  // return the next function with the empty state
  return next(state, action);
}
