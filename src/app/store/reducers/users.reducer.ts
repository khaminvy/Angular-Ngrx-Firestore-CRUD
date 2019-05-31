import { Action } from '@ngrx/store';
import { IUser } from '../models/user.interface'
import {
  UserActionTypes,
  UserActions,
  SetUsers,
  SetUser,
  DeleteUserSuccess,
  UpdateUserSuccess,
  AddUserSuccess
} from '../actions/user.actions'


export interface State {
  allUsers: IUser[],
  currentUser: IUser
}

export const initialState: State = {
  allUsers: [],
  currentUser: null
};

export const getUsers = (state: State) => {
  return state.allUsers;
}
export const getUser = (state: State) => {
  return state.currentUser;
}

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.SetUsers:
      return handleSetUsers(state,action);
    case UserActionTypes.SetUser:
      return handleSetUser(state,action);
    case UserActionTypes.DeleteUser_success:
      return handleDeleteUserSuccess(state,action);
    case UserActionTypes.UpdateUser_success:
      return handleUpdateUserSuccess(state,action);
    case UserActionTypes.AddUser_success:
      return handleAddUserSuccess(state,action);
    default:
      return state;
  }
}

function handleSetUsers(state: State, action: SetUsers): State{
  return {
    ...state,
    allUsers: action.payload
  }
}

function handleSetUser(state: State, action: SetUser): State{
  return {
    ...state,
    currentUser: action.payload
  }
}

function handleDeleteUserSuccess(state: State, action: DeleteUserSuccess): State{
  return {
    ...state,
    currentUser: null
  }
}

function handleUpdateUserSuccess(state: State, action: UpdateUserSuccess): State{
  return {
    ...state,
    currentUser: null
  }
}

function handleAddUserSuccess(state: State, action: AddUserSuccess): State{
  return {
    ...state,
    currentUser: null
  }
}

