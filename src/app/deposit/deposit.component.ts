import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { DepositRequest } from '../model/deposit-request';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
 accountNumber: string = '';
  amount: number = 0;
successMessage: string = '';
errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  onSubmit(): void {
    const request: DepositRequest = {
      accountNumber: this.accountNumber,
      amount: this.amount
    };

     this.accountService.deposit(request).subscribe({
    next: (response) => {
      this.successMessage = "Deposit successful!";
      setTimeout(() => {
        this.router.navigate(['/accounts']);
      }, 1000);
    },
    error: (err) => {
      this.errorMessage = err.error?.detail || "Deposit failed";
    }
  });
  }
  
}
