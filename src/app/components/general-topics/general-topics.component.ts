import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MomentModule } from 'angular2-moment';
import { Topic } from 'src/app/models/topic.model';
import { global_info } from 'src/app/services/global_info';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'general-topics',
  templateUrl: './general-topics.component.html',
  styleUrls: ['./general-topics.component.css']
})
export class GeneralTopicsComponent implements OnInit {
  public userInfo = null;
  public token = null;
  @Input() topics: Array<Topic>;
  @Input() search: boolean;
  public topicTE: Topic; //Topic to edit / see / delete
  public status:string;
  public statusEdit:string;
  public message: string;
  public langList: Array<string> = global_info.langList;
  editorOpt: AngularEditorConfig = global_info.editorOpt;
  dtOptions: DataTables.Settings = {
    pageLength: 4,
      processing: true,
      info: false,
      ordering: false,
      scrollCollapse: true,
      lengthChange: false
  };
  constructor(
    private _userService: UserService,
    private _topicService: TopicService
    ) {
    this.loadUser();
    this.topicTE = new Topic('','','','','','','','');
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.dtOptions.searching = this.search;
  }


  deleteTopic(){
    this._topicService.delete(this.topicTE._id, this.token).subscribe(
      response => {
        this.status = response.status;
        // To update the screen!
        let index = this.topics.findIndex(element => element._id == this.topicTE._id);
        this.topics.splice(index,1);
      },
      er => {
        this.status = er.error.status;
        //this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  onSubmit(form){
    console.log(this.topicTE);

    this._topicService.update(this.topicTE, this.token).subscribe(
      response => {
        let index = this.topics.findIndex(element => element._id == this.topicTE._id);
        this.topics[index] = this.topicTE;
        this.statusEdit = response.status;
      },
      er => {
        this.statusEdit = er.error.status;
        this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  loadTopic(topic){
    this.topicTE = topic;
  }

  loadLang(lang){
    console.log(lang.target.value);
    this.topicTE.lang = lang.target.value;
  }

  newContent(content: String){
    let newContent: String = content.replace(/(<([^>]+)>)/gi, "").substr(0,200);
    if(content.length > 200) newContent+= " ...";
    return newContent;
  }
}
