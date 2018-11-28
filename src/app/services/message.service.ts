import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Message } from '../models/message';
import { Global } from './global';


@Injectable()
export class MessageService {
   public url: string;

   constructor(
      private _http: HttpClient
   ) {
      this.url = Global.url;
   }

   addMessage(token, message): Observable<any>{
      const params = JSON.stringify(message);
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

      return this._http.post(this.url + 'newmessage', params, {headers: headers});
   }

   getReceived(token, page = 1): Observable<any>{
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

      return this._http.get(this.url + 'received/' + page, {headers: headers});
   }

   getEmitted(token, page = 1): Observable<any>{
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

      return this._http.get(this.url + 'emitted/' + page, {headers: headers});
   }
}
