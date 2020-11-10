import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { global_info } from 'src/app/services/global_info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, DoCheck {
  title = 'User Settings';
  public userInfo = null;
  public token = null;
  public user: User;
  public status: string;
  public url: string;
  public avatar: string;
  public formData: any;
  constructor(public _userService: UserService) {
    this.loadUser();
    this.url = global_info.url;
    this.user = new User(this.userInfo._id,
      this.userInfo.name,
      this.userInfo.surname,
      this.userInfo.role,
      this.userInfo.email, '',
      this.userInfo.avatar);
    this.formData = new FormData();
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.userInfo = this._userService.getInfoUser();
    this.token = this._userService.getToken();
  }

  onSubmit(form){
    //alert(this.token);
    this.formData.set("name", this.user.name);
    this.formData.set("surname", this.user.surname);
    this.formData.set("email", this.user.email);
    this._userService.update(this.formData, this.token).subscribe(
      response => {
        console.log(response);
        response.user.sub = response.user._id;
        localStorage.setItem('userInfo',JSON.stringify(response.user));
        this.userInfo = this._userService.getInfoUser();
        this.user.avatar = this.userInfo.avatar;
        //if(!this.userInfo.email.localeCompare(response.user.email))
        this.status = response.status;
      },
      er => {
        this.status = er.error.status;
        //this.status = 'Error';
        console.log(<any>er);
      }
    );
  }

  avatarName(file){
    console.log(file);
    this.user.avatar = file.target.files[0].name;
    this.formData.set("file0", file.target.files[0],this.user.avatar);
  }
}
