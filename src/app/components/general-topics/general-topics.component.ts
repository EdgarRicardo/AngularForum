import { Component, Input, OnInit } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { Topic } from 'src/app/models/topic.model';
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
  public topicTE: Topic; //Topic to edit / see / delete
  public status:string;
  public statusEdit:string;
  public message: string;
  public langList: Array<string>;
  dtOptions: DataTables.Settings = {};
  constructor(
    private _userService: UserService,
    private _topicService: TopicService
    ) {
    this.dtOptions = {
      pageLength: -1,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
      processing: true,
      info: false,
      ordering: false,
      scrollCollapse: true,
      /*columnDefs:[
        { orderable: false,targets: 1},
        { width: "150%", targets: 0 },
        { width: "0%", targets: 1 }
      ]*/
    };
    this.loadUser();
    this.topicTE = new Topic('','','','','','','','');
    this.langList = [
      "php",
      "typescript",
      "html",
      "javascript",
      "python",
      "c",
      "c++",
      "css",
      "c#",
      "java",
      "another"
    ];
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
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
}
