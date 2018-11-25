import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers: [UserService, FollowService]
})
export class FollowingComponent implements OnInit, DoCheck {

   public identifiedUser: User;
   public page: number;
   public nextPage: number;
   public prevPage: number;
   public status: string;
   public total: number;
   public totalPages: number;
   public users;
   public url;
   public following;
   public userFollowing;
   public userId: string;
   public token: string;
   public userNick: string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _followService: FollowService
   ) {
      this.url = Global.url;
      if (localStorage.getItem('token')) {
         this.token = localStorage.getItem('token');
      } else {
         this.token = null;
      }
   }

   ngOnInit() {
      this.getIdentified();
      this.actualPage();
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

   actualPage() {
      this._route.params.subscribe(
         params => {
            this.page = +params['page'];
            this.userId = params['id'];
            this._userService.getUser(this.userId).subscribe(
               res => {
                  this.userNick = res.user.nick;
               }, err => {
                  console.log(<any>err);
               }
            );

            if (!this.page) {
               this.page = 1;
            }

            this.prevPage = this.page - 1;
            this.nextPage = this.page + 1;
            this.getUsersFollowing(this.token, this.userId, this.page);
            this._userService.getUsers().subscribe(
               res => {
                  this.following = res.users_following;
               }, error => {
                  console.log(<any>error);
               }
            );
         }
      );
   }

   getUsersFollowing(token, userId = null, page = 1) {
      this._followService.getFollowingUsers(token, userId, page).subscribe(
         response => {
            if (!response.follows || response.follows.length <= 0) {
               this.status = 'error';
            } else {
               this.total = response.total;
               this.totalPages = response.pages;
               this.users = response.follows;
               // this.following = response.following;

               if (page > this.totalPages) {
                  this._router.navigate(['following/', userId, 1]);
               }
            }
         },
         error => {
            console.log('Error: ', error);
            if (error != null) {
               this.status = 'error';
            }
         }
      );
   }

   followUser(user) {
      const follow = new Follow('', user, this.identifiedUser._id);

      this._followService.addFollow(localStorage.getItem('token'), follow).subscribe(
         res => {
            if (!res.follow) {
               this.status = 'error';
            } else {
               this.status = 'success';
               this.following.push(res.follow.user);
               this._userService.getCounters().subscribe(resp => {
                  localStorage.setItem('stats', JSON.stringify(resp));
               });
            }
         },
         err => {
            console.log('Error: ', err.error);
            if (err != null) {
               this.status = 'error';
            }
         }
      );
   }

   unfollowUser(user) {
      this._followService.deleteFollow(localStorage.getItem('token'), user).subscribe(
         res => {
            if (res) {
               this.following.splice(this.following.indexOf(user), 1);
               this._userService.getCounters().subscribe(resp => {
                  localStorage.setItem('stats', JSON.stringify(resp));
               });
            }
         },
         err => {
            console.log('Error: ', err.error);
         }
      );
   }

   mouseEnter(userId) {
      this.userFollowing = userId;
   }
   mouseLeave() {
      this.userFollowing = 0;
   }

   viewProfile(id) {
      this._router.navigate(['profile/' + id]);
   }

}
