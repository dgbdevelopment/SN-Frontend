import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.css'],
   providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit, DoCheck {

   @Input() IdentUser: User;

   public token: string;
   public stats: any;
   public url: string;
   public status: string;
   public pub: Publication;
   public filesToUpload: Array<File>;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _publicationService: PublicationService,
      private _uploadService: UploadService
   ) {
      this.token = this._userService.getToken();
      this.stats = this._userService.getStats();
      this.url = Global.url;
      this.pub = new Publication('', '', '', '', null);
   }

   ngOnInit() {
      this.getCounters();
   }

   ngDoCheck() {
      this.stats = this._userService.getStats();
   }

   onSubmit(form) {
      this.pub.user = this.IdentUser._id;
      this._publicationService.addPub(this.token, this.pub).subscribe(
         response => {
            if (response.pub) {
               // this.pub = response.pub;
               // tslint:disable-next-line:max-line-length
               this._uploadService.makeFileRequest(this.url + 'uploadimagepub/' + response.pub._id, [], this.filesToUpload, this.token, 'file' )
               .then((result: any) => {
                  if (result.pub) {
                     this.pub.file = result.pub.file;
                  }
                  this.status = 'success';
                  setTimeout(() => {
                     this.status = '';
                     if (window.location.href.indexOf('timeline/' + this.pub.user) !== -1) {
                        window.location.reload();
                     } else {
                        this._router.navigate(['timeline/' + this.pub.user]);
                     }
                  }, 5000);
               this.getCounters();
               form.reset();
               });
            }
         },
         error => {
            console.log('ERROR', error);
            this.status = 'error';
            setTimeout(() => { this.status = ''; }, 5000);
         }
      );
   }

   fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
   }
   getCounters() {
      this._userService.getCounters().subscribe(resp => {
         localStorage.setItem('stats', JSON.stringify(resp));
      });
   }
}
