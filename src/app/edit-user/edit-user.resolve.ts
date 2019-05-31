import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../store/reducers';
import {
  LoadUser
} from '../store/actions/user.actions';
import { Observable, of } from 'rxjs';
import { User } from '../store/models/user.model';
import { take, filter, skip, map } from 'rxjs/operators';

@Injectable()
export class EditUserResolver implements Resolve<any> {

  item$: any
  constructor(public firebaseService: FirebaseService, private store: Store<fromStore.State>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.store.dispatch(new LoadUser(userId));
      this.store.select(fromStore.getUser).pipe(
        skip(1),
        filter(data => !!data)
      )
      .subscribe(data => {
        resolve({data, userId})
      })
    })
  }
}