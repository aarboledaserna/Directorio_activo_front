import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
  userProfile?: any;

  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
      const account = this.msalService.instance.getAllAccounts()[0];
      if (account) {
          this.userProfile = account;
      }
  }
}