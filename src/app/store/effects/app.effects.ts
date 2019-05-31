import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  UserActionTypes,
  SetUsers,
  SetUser,
  DeleteUserSuccess,
  UpdateUserSuccess,
  AddUserSuccess,
  
} from '../actions/user.actions'
import { switchMap, map } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';
import { IUser } from '../models/user.interface';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private service: FirebaseService, public router : Router, public route: ActivatedRoute) {}

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    switchMap(() => {
      return this.service.getUsers()
        .pipe(
          map(actions => {
            const users = actions.map(a => {
              const data = a.payload.doc.data() as IUser;
              const id = a.payload.doc.id;
              return {id,...data}
            })
            return new SetUsers(users)
          })
        )
    })
  )

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUser),
    switchMap((item) => {
      const id = item["payload"];
      return this.service.getUser(id)
        .pipe(
          map(action => {
            const user  = action.payload.data() as IUser
            return new SetUser(user)
          })
        )
    })
  )

  @Effect()
  DeleteUser$ = this.actions$.pipe(
    ofType(UserActionTypes.DeleteUser),
    switchMap((item) => {
      const id = item["payload"];
      return this.service.deleteUser(id).then(
        res => {
          this.router.navigate(['/home']);
          return new DeleteUserSuccess()
        }
      )
    })
  )

  @Effect()
  UpdateUser$ = this.actions$.pipe(
    ofType(UserActionTypes.UpdateUser),
    switchMap((item) => 
    {
      const { id } = item["payload"];
      const { ...user } = item["payload"] as IUser
      return this.service.updateUser(id, user).then(
        res => {
          this.router.navigate(['/home']);
          return new UpdateUserSuccess()
        }
      ).catch(err => {
        console.log("some error:.", err)
      })
    })
  )

  @Effect()
  AddUser$ = this.actions$.pipe(
    ofType(UserActionTypes.AddUser),
    switchMap((item) => 
    {

      const user = item["payload"];
      const avatar = item['avatar']
      return this.service.createUser(user, avatar).then(
        res => {
          this.router.navigate(['/home']);
          return new AddUserSuccess()
        }
      ).catch(err => {
        console.log("some error:.", err)
      })
    })
  )
}
