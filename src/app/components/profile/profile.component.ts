import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Follow } from '../../models/follow';
import { FollowService } from '../../services/follow.service';
import { Global } from '../../services/global';


@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.css'],
   providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit, DoCheck {

   public identifiedUser: User;
   public token: string;
   public url: string;
   public stats;
   public userToShow;
   public userStats;
   public followed;
   public following;
   public userFollowing;

   constructor(
      private _userService: UserService,
      private _router: Router,
      private _route: ActivatedRoute,
      private _followService: FollowService

   ) {
      this.token = this._userService.getToken();
      this.stats = this._userService.getStats();
      this.url = Global.url;
   }

   ngOnInit() {
      this.getIdentified();
      this.load();
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

   load() {
      this._route.params.subscribe(
         params => {
            if (params['id']) {
               const id = params['id'];
               this.getUser(id);
               this.getCounters(id);
            } else {
               this.getUser();
               this.getCounters();
            }
         }
      );
   }

   getUser(id?) {
      if (!id) { id = ''; }
      this._userService.getUser(id).subscribe(
         response => {
            this.userToShow = response.user;
            if (response.followed) {
               this.followed = true;
            }
            if (response.following) {
               this.following = true;
            }
         }, error => {
            console.log(error);
         }
      );
   }

   getCounters(id?) {
      if (!id) { id = ''; }
      this._userService.getCounters(id).subscribe(
         response => {
            this.userStats = response;
         }, error => {
            console.log(error);
         }
      );
   }

   followUser(user) {
      const follow = new Follow('', user, this.identifiedUser._id);

      this._followService.addFollow(localStorage.getItem('token'), follow).subscribe(
         res => {
            if (!res.follow) {
               console.log('Error al seguir');
            } else {
               this.following = true;
               this._userService.getCounters().subscribe(resp => {
                  localStorage.setItem('stats', JSON.stringify(resp));
               });
               console.log('Seguimiento correcto');
               this.userStats.followed++;
            }
         },
         err => {
            console.log('Error: ', err.error);
         }
      );
   }

   unfollowUser(user) {
      this._followService.deleteFollow(localStorage.getItem('token'), user).subscribe(
         res => {
            if (res) {
               console.log(res.message);
               this.following = false;
               this._userService.getCounters().subscribe(resp => {
                  localStorage.setItem('stats', JSON.stringify(resp));
               });
               this.userStats.followed--;
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
}
