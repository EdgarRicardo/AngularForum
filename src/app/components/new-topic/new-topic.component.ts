import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Topic } from 'src/app/models/topic.model';
import { global_info } from 'src/app/services/global_info';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {
  titleP = 'New Topic';
  public userInfo = null;
  public token = null;
  public status: string;
  public url: string;
  public topic: Topic;
  public langList: Array<string>;
  public message: string;
  editorOpt: AngularEditorConfig = global_info.editorOpt;
  constructor(private _userService: UserService,
    private _topicService: TopicService
    ) {
      this.loadUser();
      this.url = global_info.url;
      this.topic = new Topic('','','','','',null,this.userInfo._id,null);
      this.langList = global_info.langList;
      this.editorOpt.editable = this.token ? true : false;
    }

  ngOnInit(): void {
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  onSubmit(form){
    this._topicService.register(this.topic, this.token).subscribe(
      response => {
        this.topic._id = response.topic._id;
          this.status = response.status;
      },
      er => {
        this.status = er.error.status;
        this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  loadLang(lang){
    console.log(lang.target.value);
    this.topic.lang = lang.target.value;

  }
}
