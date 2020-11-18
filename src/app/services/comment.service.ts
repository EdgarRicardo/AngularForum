import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global_info } from './global_info';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public url: string;
  public userInfo = null;
  public token = null;

  constructor(public _http: HttpClient) {
    this.url = global_info.url;
  }

  test(){
    return 'test Service';
  }

  request(comment, link, type, token = null): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders();
    let data = JSON.stringify(comment);
    headers = headers.append('Content-Type', 'application/json');

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

  register(idTopic,comment, token){
    return this.request(comment, 'comment/'+idTopic,'post', token);
  }

  update(comment, token){
    return this.request(comment, 'comment/'+comment._id,'put', token);
  }

  delete(id, token){
    return this.request(null, 'comment/'+id,'delete', token);
  }

  getcomments(idTopic){
    return this.request(null,'comment/'+idTopic,'get');
  }


}
