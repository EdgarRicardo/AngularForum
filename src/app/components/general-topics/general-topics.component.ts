import { Component, Input, OnInit } from '@angular/core';
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
  public message: string;
  dtOptions: DataTables.Settings = {};
  constructor(
    public _userService: UserService,
    public _topicService: TopicService
    ) {
    this.dtOptions = {
      pageLength: -1,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
      processing: true,
      info: false,
      ordering: false,
      scrollCollapse: true,
      scrollX: true,
      scrollY: "600px",

    };
    this.loadUser();
    this.topicTE = new Topic('','','','','','','');
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

        console.log(response);
      },
      er => {
        this.status = er.error.status;
        //this.message = er.error.message;
        console.log(<any>er);
      }
    );
  }

  loadTopic(topic){
    this.topicTE = topic;
  }
}
