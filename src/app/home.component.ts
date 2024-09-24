import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private msalService: MsalService) {}

  login() {
      this.msalService.loginRedirect();
  }

  logout() {
      this.msalService.logout();
  }

  getAccount() {
      const account = this.msalService.instance.getAllAccounts();
      return account.length > 0 ? account[0] : null;
  }
}