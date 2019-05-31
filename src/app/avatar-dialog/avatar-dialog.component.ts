import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.css']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>()

  constructor(
    public firebaseService : FirebaseService,
    public dialogRef : MatDialogRef<AvatarDialogComponent>
  ) { }

  ngOnInit() {
    this.getAvatars()
  }

  getAvatars = () => {
    this.firebaseService.getAvatars().subscribe(
      data => {
        this.avatars = data
      }
    )
  }

  close(avatar){
    this.dialogRef.close(avatar);
  }

}
