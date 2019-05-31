import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from '../store/reducers';
import {
  AddUser
} from '../store/actions/user.actions';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  name: FormControl;
  surname: FormControl;
  age: FormControl;
  item: any;

  avatarLink: string = "https://cdn.pixabay.com/photo/2017/01/31/19/07/avatar-2026510_960_720.png"

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'age': [
      { type: 'required', message: 'Age is required.' },
    ]
 };

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private router: Router,
    private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls = () => {
    this.name = new FormControl('', Validators.required );
    this.surname = new FormControl('', Validators.required);
    this.age = new FormControl('', Validators.required)
  }

  createForm = () => {
    this.exampleForm = new FormGroup({
      name : this.name,
      surname: this.surname,
      age: this.age
    })
  }

  onSubmit(value){
    this.store.dispatch(new AddUser(value, this.avatarLink));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  

}
