import { Component } from '@angular/core';
import { global_info } from './services/global_info';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Personal Blog';
  public userInfo;
  public token;
  public url;

  constructor(public _userService: UserService,){
    this.loadUser();
    this.url = global_info.url;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    console.log('Page loaded correctly');
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.loadUser();

  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }
}
