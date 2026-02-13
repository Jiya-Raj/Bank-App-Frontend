import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountRequest } from '../model/account-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  account: AccountRequest = new AccountRequest();


  constructor(private accountService: AccountService,private router: Router) {}

  onSubmit(): void {
    this.saveAccount();
  }

  saveAccount(): void {
    this.accountService.createAccount(this.account).subscribe(() => {
      this.goToAccountList();
    });
  }

  goToAccountList(): void {
    this.router.navigate(['/accounts']);
  }
}
