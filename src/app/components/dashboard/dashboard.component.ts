import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public account: any;
  constructor() { }

  ngOnInit(): void {
    let account = localStorage.getItem("account")
    this.account = JSON.parse(account);


  }

}
