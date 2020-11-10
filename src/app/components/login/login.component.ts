import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
    this.title = 'Sign in';
    this.user = new User(undefined, '', '', 'Normal', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form){
    /*alert(Object.values(this.user));
    alert(this._userService.test());*/
    this._userService.login(this.user).subscribe(
        response => {
          console.log(response);
          this.status = response.status;

          //Save user credentials in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userInfo', JSON.stringify(response.user));

          this._router.navigate(['/home']);
          form.reset();
        },
        er => {
          this.status = er.error.status;
          //this.status = 'Error';
          console.log(<any>er);
        }
      );
  }

  logout(){
    this._route.params.subscribe( params => {
      if(+params['sure']){
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        this._router.navigate(['/home']);
      }
    });
    //this._router.navigate(['/home']);
  }

}

