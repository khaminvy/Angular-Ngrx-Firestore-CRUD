import { Action } from '@ngrx/store';
import { IUser } from '../models/user.interface';

export enum UserActionTypes {
  LoadUsers  = '[User] Load Users',
  SetUsers   = '[User] Set Users',
  LoadUser   = '[User] Load User',
  SetUser    = '[User] Set User',
  DeleteUser = '[User] Delete User',
  DeleteUser_success = '[User] Delete User Success',
  UpdateUser = '[User] Update User',
  UpdateUser_success = '[User] Update User Success',
  AddUser = '[User] Add User',
  AddUser_success = '[User] Add User Success'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class SetUsers implements Action {
  readonly type = UserActionTypes.SetUsers;

  constructor(public payload: IUser[]) {}
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;

  constructor(public payload: string ) {}
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SetUser;

  constructor(public payload: IUser) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUser_success;
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;
  
  constructor(public payload: string) {}

}

export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.AddUser_success;
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;
  
  constructor(public payload: IUser, public avatar: string) {}

}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UpdateUser_success;
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  
  constructor(public payload: IUser) {}

}

export type UserActions = LoadUsers | SetUsers | LoadUser | SetUser  |
  DeleteUser | DeleteUserSuccess | UpdateUser | UpdateUserSuccess | AddUser | AddUserSuccess;
