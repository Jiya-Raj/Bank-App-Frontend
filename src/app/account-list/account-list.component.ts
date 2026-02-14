import { Component } from '@angular/core';
import { Account } from '../model/account';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Router,RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent {
   showAll:boolean=false;
  constructor(private accountService: AccountService,
    private router: Router,
    private authService: AuthenticationService
  ) { }
  ngOnInit(): void {
    this.getAccounts();
  }
  accounts: Account[] = [];

  getAccounts(): void {
  if (this.role === 'MANAGER' && this.showAll) {
    this.accountService.getAllAccountsIncludingClosed()
      .subscribe(data => this.accounts = data);
  } else {
    this.accountService.getAllAccounts()
      .subscribe(data => this.accounts = data);
  }
}

toggleView(): void {
  this.showAll = !this.showAll;
  this.getAccounts();
}

  get role(): string | null {
  return this.authService.getUserRole();
}


  accountDetails(accountNumber: string): void {
    this.router.navigate(['account-details',accountNumber]);
  }
  updateAccount(accountNumber: string): void {
    this.router.navigate(['update-account', accountNumber]);
  }
  deleteAccount(accountNumber: string): void {
    this.accountService.deleteAccount(accountNumber).subscribe(() => {
      this.getAccounts();
    });
  }
}
