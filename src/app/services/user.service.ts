import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class UserService {
   public url: string;
   public identifiedUser: User;
   public token: string;

   constructor(
      private _http: HttpClient
   ) {
      this.url = Global.url;
   }

   register(newUser: User): Observable<any> {
      // console.log(newUser);
      // console.log(this.url);
      const params = JSON.stringify(newUser);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._http.post(this.url + 'signup', params, { headers: headers });
   }

   login(user: User, getToken: boolean = false): Observable<any> {

      getToken ? user.getToken = true : user.getToken = null;

      const params = JSON.stringify(user);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._http.post(this.url + 'signin', params, { headers: headers });
   }

   getIdentifiedUser(): Observable<any> {

      const token = this.getToken();

      const headers = new HttpHeaders().set('Content-type', 'application/json')
         .set('Authorization', token);

      return this._http.get(this.url + 'user', { headers: headers });
   }

   getToken() {
      const token = localStorage.getItem('token');

      if (token) {
         this.token = token;
      } else {
         this.token = null;
      }

      return this.token;
   }

   getCounters(user?): Observable<any> {
      const token = this.getToken();

      const headers = new HttpHeaders().set('Content-type', 'application/json')
         .set('Authorization', token);

         if (user) {
            return this._http.get(this.url + 'counters/' + user, { headers: headers });
         }
         return this._http.get(this.url + 'counters/', { headers: headers });
   }
   updateUser(updateUser: User): Observable<any> {
      // console.log(newUser);
      // console.log(this.url);
      const token = this.getToken();
      const params = JSON.stringify(updateUser);
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', token);

      return this._http.put(this.url + 'update/' + updateUser._id, params, { headers: headers });
   }
   getUsers(page = null): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', this.getToken());
      return this._http.get(this.url + 'users/' + page, { headers: headers });
   }

   getAllUsers(): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', this.getToken());
      return this._http.get(this.url + 'allusers', { headers: headers });
   }
   getUser(userId?): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', this.getToken());
      return this._http.get(this.url + 'user/' + userId, { headers: headers });
   }

   getStats() {
      return JSON.parse(localStorage.getItem('stats'));
   }
}
