import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public loginResult: string;
  constructor(private _authService: AuthService, private _router: Router, private _flashMessages: FlashMessagesService) { }

  ngOnInit(): void {

  }

  loginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this._authService.authenticateUser(user).subscribe(data => {
      if (data["success"] == false) {
        this.loginResult = data["message"];

      } else {
        this._authService.storeUserData(data["token"], data["account"]);
        this._router.navigate(['/dashboard']);

        this._flashMessages.show(`${data["account"]["name"]} is now online.`, {
          cssClass: 'alert-success',
          timeout: 3000
        })
      }
    })
  }

}
