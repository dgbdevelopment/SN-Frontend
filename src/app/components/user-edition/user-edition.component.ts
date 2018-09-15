import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css'],
  providers: [UserService, UploadService]
})
export class UserEditionComponent implements OnInit, DoCheck {

   public identifiedUser: User;
   public done: string;
   public filesToUpload: Array<File>;
   public url: string;

  constructor(
     private _route: ActivatedRoute,
     private _router: Router,
     private _userService: UserService,
     private _uploadService: UploadService
  ) {
     this.url = Global.url;
  }

  ngOnInit() {
   this.getIdentified();
   }

   ngDoCheck() {
      if (this.identifiedUser !== undefined && localStorage.getItem('token')) { return false; }
      this.getIdentified();
   }

   getIdentified() {
      this._userService.getIdentifiedUser().subscribe(res => {
         if (res.user) {
            this.identifiedUser = res.user;
         } else {
            this.identifiedUser = null;
         }
      }, err => {
         this.identifiedUser = null;
      });
   }
   onSubmit(form) {
      this.identifiedUser.nick = this.identifiedUser.nick.toLocaleLowerCase();
      this.identifiedUser.email = this.identifiedUser.email.toLocaleLowerCase();
      this._userService.updateUser(this.identifiedUser).subscribe(res => {
         if (res.user && res.user._id) {
            this.identifiedUser = res.user;
            this._uploadService.makeFileRequest(Global.url + 'uploadimage/' + res.user._id, [],
             this.filesToUpload, localStorage.getItem('token'), 'image')
             .then((result: any) => {
               this.done = 'yes';
               location.reload();
             });

         } else {
            this.done = 'no';
         }
      }, err => {
         console.log(err);
         this.done = 'no';
      });
   }

   fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
   }
}
