import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Follow } from '../models/follow';
import { Global } from './global';


@Injectable()
export class FollowService {
   public url: string;

   constructor(
      public _http: HttpClient
   ) {
      this.url = Global.url;
   }

   addFollow(token, follow): Observable<any> {
      const params = JSON.stringify(follow);
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
      return this._http.post(this.url + 'follow', params, { headers: headers });
   }

   deleteFollow(token, id): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application.json')
                                       .set('Authorization', token);
      return this._http.delete(this.url + 'follow/' + id, {headers: headers});
   }
}
