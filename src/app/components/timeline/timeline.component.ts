import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { Global } from '../../services/global';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import * as $ from 'jquery';

@Component({
   selector: 'app-timeline',
   templateUrl: './timeline.component.html',
   styleUrls: ['./timeline.component.css'],
   providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit, DoCheck {

   public identifiedUser: User;
   public userId: string;
   public token: string;
   public url: string;
   public pub: Publication;
   public page: number;
   public totalItems: number;
   public totalPages: number;
   public pubs: Publication[];
   public own: boolean;

   constructor(
      private _userService: UserService,
      private _router: Router,
      private _route: ActivatedRoute,
      private _publicationService: PublicationService
   ) {
      this.url = Global.url;
      this.token = this._userService.getToken();
   }

   ngOnInit() {
      this.getIdentified();
      this.myOwn();
   }

   ngDoCheck() {
      if (this.identifiedUser !== undefined && localStorage.getItem('token')) { return false; }
      this.getIdentified();
   }

   getIdentified() {
      this._userService.getIdentifiedUser().subscribe(
         res => {
            if (res.user) {
               this.identifiedUser = res.user;
            } else {
               this.identifiedUser = null;
            }
         }, err => {
            this.identifiedUser = null;
         });
   }

   getPubs(userId = '', page?) {
      if (userId !== '') {
         this._publicationService.getMyPubs(this.token, this.userId, page).subscribe(
            res => {
               if (res.pubs) {
                  this.page = res.page;
                  if (this.page === 1) { this.pubs = []; }
                  this.totalItems = res.total_items;
                  this.totalPages = res.pages;
                  if (!this.pubs) {
                     this.pubs = res.pubs;
                  } else {
                     this.pubs = this.pubs.concat(res.pubs);
                  }
                  if (this.page > this.totalPages) {
                     this.page = this.totalPages;
                  }
                  if (this.page < 1) {
                     this.page = 1;
                  }
               }
            }, err => {
               console.log(err);
            });
      } else {
         this._publicationService.getPubs(this.token, page).subscribe(
            res => {
               if (res.pubs) {
                  this.page = res.page;
                  if (this.page === 1) { this.pubs = []; }
                  this.totalItems = res.total_items;
                  this.totalPages = res.pages;
                  if (!this.pubs) {
                     this.pubs = res.pubs;
                  } else {
                     this.pubs = this.pubs.concat(res.pubs);
                  }
                  if (this.page > this.totalPages) {
                     this.page = this.totalPages;
                  }
                  if (this.page < 1) {
                     this.page = 1;
                  }
               }
            }, err => {
               console.log(err);
            });
      }

   }
   myOwn() {
      this._route.params.subscribe(
         params => {
            if (params['id']) {
               this.userId = params['id'];
               this.getPubs(this.userId);
            } else {
               this.userId = '';
               this.getPubs();
            }
         }

      );
   }

   // actualPage() {
   //    this._route.params.subscribe(
   //       params => {
   //          this.page = +params['page'];

   //          if (!this.page) {
   //             this.page = 1;
   //          }

   //          this.prevPage = this.page - 1;
   //          this.nextPage = this.page + 1;
   //          this.getPubs(this.page);
   //       }
   //    );
   // }

   moreViews() {
      this.page++;
      this.getPubs(this.userId, this.page);
      $('html, body').animate({ scrollTop: $('body').prop('scrollHeight') }, 750);
   }

}
