import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Publication } from '../models/publication';
import { Global } from './global';


@Injectable()
export class PublicationService {
   public url: string;

   constructor(
      private _http: HttpClient
   ) {
      this.url = Global.url;
   }

   addPub(token, pub): Observable<any> {
      const params = JSON.stringify(pub);
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

      return this._http.post(this.url + 'newpub', params, {headers: headers});
   }

   getPubs(token, page = 1): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

      return this._http.get(this.url + 'getpubs/' + page, {headers: headers});
   }
   getMyPubs(token, userId, page = 1): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

      return this._http.get(this.url + 'getmypubs/' + userId + '/' + page, {headers: headers});
   }

   deletePub(token, id) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

      return this._http.delete(this.url + 'deletepub/' + id, {headers: headers});
   }
}
