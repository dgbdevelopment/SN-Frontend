import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
   selector: 'app-users',
   templateUrl: './users.component.html',
   styleUrls: ['./users.component.css'],
   providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit, DoCheck {
   public identifiedUser: User;
   public page: number;
   public nextPage: number;
   public prevPage: number;
   public status: string;
   public total: number;
   public totalPages: number;
   public users: User[];
   public url;
   public following;
   public userFollowing;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _followService: FollowService
   ) {
      this.url = Global.url;
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

            if (!this.page) {
               this.page = 1;
            }

            this.prevPage = this.page - 1;
            this.nextPage = this.page + 1;
            this.getUsers(this.page);
         }
      );
   }

   getUsers(page) {
      this._userService.getUsers(page).subscribe(
         response => {
            if (!response.users || response.users.length <= 0) {
               this.status = 'error';
            } else {
               this.total = response.total;
               this.totalPages = response.totalPages;
               this.users = response.users;
               this.following = response.users_following;

               if (page > this.totalPages) {
                  this._router.navigate(['users/', 1]);
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
               console.log('Seguimiento correcto');
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
               console.log(res.message);
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
