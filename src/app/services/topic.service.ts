import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global_info } from './global_info';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public url: string;
  public userInfo = null;
  public token = null;

  constructor(public _http: HttpClient) {
    this.url = global_info.url;
  }

  test(){
    return 'test Service';
  }

  request(topic, link, type, token = null): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders();
    let data = JSON.stringify(topic);
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

  register(topic){
    return this.request(topic, 'topic','post');
  }

  update(topic, token){
    return this.request(topic, 'topic','put', token);
  }

  delete(id, token){
    return this.request(null, 'topic/'+id,'delete', token);
  }

  getTopic(id){
    return this.request(null, 'topic','get');
  }

  getTopics(){
    return this.request(null, 'topic','get');
  }

  getTopicsByUser(id){
    return this.request(null, 'topic/byuser/'+id,'get');
  }

}
