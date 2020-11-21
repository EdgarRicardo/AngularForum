import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { User } from 'src/app/models/user.model';
import { global_info } from 'src/app/services/global_info';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {

  titleP = 'New Topic';
  public userInfo = null;
  public token = null;
  public status: string;
  public url: string;
  public topics: Array<Topic>;
  public idProfile: string;
  public profile: User;
  public search = false;
  constructor(
    private _topicService: TopicService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    ) {
      this.url = global_info.url;
    }

  ngOnInit(): void {
    this.loadProfile();
    this.loadTopics();
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this.idProfile != this._activatedRoute.snapshot.params.id){
      this.idProfile = this._activatedRoute.snapshot.params.id;
      this.loadProfile();
      this.loadTopics();
    }
  }

  loadTopics(){
    this.idProfile = this._activatedRoute.snapshot.params.id;
    this._topicService.getTopicsByUser(this.idProfile).subscribe(
      response => {
        this.topics = response.topics;
        this.status = response.status;
      },
      er => {
        this._router.navigateByUrl('error');
        console.log(<any>er);
      }
    );
  }

  loadProfile(){
    this.idProfile = this._activatedRoute.snapshot.params.id;
    this._userService.getUser(this.idProfile).subscribe(
      response => {
        console.log(response);
        this.profile = response.user;
        this.status = response.status;
      },
      er => {
        this._router.navigateByUrl('error');
        console.log(<any>er);
      }
    );
  }

}
