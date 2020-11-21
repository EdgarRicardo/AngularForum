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
    else if (type == 'get')
      return this._http.get(this.url+link);
    else if (type == 'delete')
      return this._http.delete(this.url+link, {headers: headers});
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

  getUser(id){
    return this.request(null, 'getUsers/'+id,'get');
  }

  getUsers(){
    return this.request(null, 'getUsers/','get');
  }

  getToken(){
    this.token = sessionStorage.getItem('token');
    return this.token;
  }

  getInfoUser(){
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    return this.userInfo;
  }

  logout(){
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('token');
  }

  tokenValidation(token){
    return this.request(null, 'tokenValidation','post',token);
  }


}
