import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Comment } from 'src/app/models/comment.model';
import { Topic } from 'src/app/models/topic.model';
import { CommentService } from 'src/app/services/comment.service';
import { global_info } from 'src/app/services/global_info';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  titleP = 'New Topic';
  public userInfo = null;
  public token = null;
  public status: string;
  public url: string;
  public topic: Topic;
  public comment: Comment;
  public comments: Array<Comment> = [];
  dtOptions: DataTables.Settings = {};
  constructor(private _userService: UserService,
    private _topicService: TopicService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _commentService: CommentService
    ) {
      this.loadUser();
      this.url = global_info.url;
      this.topic = new Topic('','','','','',null,'',null);
      this.comment = new Comment('','','');
      this.dtOptions = {
        pageLength: -1,
        lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
        info: false,
        "lengthChange": false,
        ordering: false,
        scrollCollapse: true,
        searching: false
      };
    }

  ngOnInit(): void {
    this.loadTopic();
    this.loadComments();
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  loadTopic(){
    this.topic._id = this._activatedRoute.snapshot.params.id;
    this._topicService.getTopic(this.topic._id).subscribe(
      response => {
        this.topic = response.topic;
      },
      er => {
        this._router.navigateByUrl('error');
        console.log(<any>er);
      }
    );
  }

  loadComments(){
    this.topic._id = this._activatedRoute.snapshot.params.id;
    this._commentService.getcomments(this.topic._id).subscribe(
      response => {
        this.comments = response.comments;
      },
      er => {
        this._router.navigateByUrl('error');
        console.log(<any>er);
      }
    );
  }

  onSubmit(form){
    this.topic._id = this._activatedRoute.snapshot.params.id;
    this._commentService.register(this.topic._id,this.comment, this.token).subscribe(
      response => {
        this.status = response.status;
        this.comment = new Comment('',' ','');
        this.loadComments();
      },
      er => {
        this.status = er.error.status;
        console.log(<any>er);
      }
    );
  }
}
