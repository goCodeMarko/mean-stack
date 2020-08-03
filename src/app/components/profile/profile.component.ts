import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public account: Object;

  constructor(private _authToken: AuthService, private _route: Router) { }

  ngOnInit(): void {

    this._authToken.getProfile().subscribe(profile => {
      this.account = profile["account"];
    });

  }

}
