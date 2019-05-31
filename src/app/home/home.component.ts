import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../store/reducers';
import {
  LoadUsers
} from '../store/actions/user.actions';
import { Observable, of, from } from 'rxjs';
import { User } from '../store/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  items$: Observable<User[]>;

  ageValue: number = 0;
  searchValue: string = "";

  constructor(public firebaseService: FirebaseService,
    private router: Router, private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
    this.getData()
  }

  getData() {
    this.items$ = this.store.select(fromStore.getUsers);
    this.items$.subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.id]);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = []
      result.forEach( item => {
        this.name_filtered_items.push(
          {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        )
      })
      this.items = this.combineLists(this.name_filtered_items, this.age_filtered_items);
      this.items$ = of(this.items)
    })
  }

  rangeChange(event){
    this.firebaseService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = []
      result.forEach( item => {
        this.age_filtered_items.push(
          {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        )
      })
      this.items = this.combineLists(this.age_filtered_items, this.name_filtered_items);
      this.items$ = of(this.items)
    })
  }

  combineLists(a, b){
    let result = [];
    
    a.filter(x => {
      return b.filter(x2 =>{
          if(x2.id == x.id){
            result.push(x2);
        }
      });
    });
    return result;
  }
}


