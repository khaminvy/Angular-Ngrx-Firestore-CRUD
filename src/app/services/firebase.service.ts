import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getAvatars(){
    return this.db.collection('avatar').valueChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }
  
  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    }).then((docRef) => {
      console.log("Document successfully written with ID: ", docRef.id);
    }).catch((err) => {
      console.error("Error writing document: ", err);
    });
  } 

  getUsers(){
      return this.db.collection('users').snapshotChanges()     
  }

  getUser(userKey){
      return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).update(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }
  
}
