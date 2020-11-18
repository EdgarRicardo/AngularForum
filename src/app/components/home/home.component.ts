import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public topics: Array<Topic>;
  public status: string;
  constructor(private _topicService: TopicService) {
    this.getTopics();
  }

  ngOnInit(): void {
  }

  getTopics(){
    this._topicService.getTopics().subscribe(
      response => {
        if(Object.keys(response.topics).length === 0) this.topics = null;
        else {
          this.topics = response.topics;
          //console.log(this.topics);
        }
      },
      er => {
        this.status = er.error.status;
        console.log(<any>er);
      }
    );
  }

}
