import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public errors: string;

  constructor(private _userService: UserService) {
    this.title = 'Sign up';
    this.user = new User('', '', '', 'Normal', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    /*alert(Object.values(this.user));
    alert(this._userService.test());*/
    this._userService.register(this.user).subscribe(
        response => {
          this.status = response.status;
          form.reset();
        },
        er => {
          this.status = er.error.status;
          this.errors = er.error.errors;
          //this.status = 'Error';
          console.log(this.errors);
        }
      );
  }
}
