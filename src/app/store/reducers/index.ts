import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUsers from './users.reducer';

export interface State {

  users: fromUsers.State;
}

export const selectUsersState = createFeatureSelector<fromUsers.State>('users');
export const getUsers = createSelector(selectUsersState, fromUsers.getUsers);
export const selectUserState = createFeatureSelector<fromUsers.State>('users');
export const getUser = createSelector(selectUserState, fromUsers.getUser);

export const reducers: ActionReducerMap<State> = {

  users: fromUsers.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
