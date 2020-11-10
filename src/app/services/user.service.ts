import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global_info } from './global_info';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public userInfo = null;
  public token = null;

  constructor(public _http: HttpClient) {
    this.url = global_info.url;
  }

  test(){
    return 'test Service';
  }

  request(user, link, type, token = null): Observable<any>{

    let headers: HttpHeaders = new HttpHeaders();
    let data: any;
    if(link == "update"){
      data = user;
    }else{
      data = JSON.stringify(user);
      headers = headers.append('Content-Type', 'application/json');
    }
    if(token)
      headers = headers.append('Authorization', token);

    if(type == 'post')
      return this._http.post(this.url+link, data, {headers: headers});
    else if (type == 'put')
      return this._http.put(this.url+link, data, {headers: headers});
  }

  register(user){
    return this.request(user, 'register','post');
  }

  login(user){
    return this.request(user, 'login','post');
  }

  update(user, token){
    return this.request(user, 'update','put', token);
  }

  getToken(){
    if(localStorage.getItem('token'))
      this.token = localStorage.getItem('token');

    return this.token;
  }

  getInfoUser(){
    if(localStorage.getItem('userInfo'))
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

      return this.userInfo;
  }

  tokenValidation(token){
    return this.request(null, 'tokenValidation','post',token);
  }


}
