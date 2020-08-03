import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public account;

  constructor(public _authService: AuthService, private _router: Router, private _flashMessages: FlashMessagesService) { }

  ngOnInit(): void {

  }

  onLogOut() {
    this.account = JSON.parse(localStorage.getItem('account'));

    this._flashMessages.show(`${this.account["name"]} is now offline.`, {
      cssClass: 'alert-danger',
      timeout: 3000
    })

    this._authService.logout();
    this._router.navigate(['/login']);

  }
}
