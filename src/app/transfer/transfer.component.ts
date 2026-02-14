import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { TransferRequest } from '../model/transfer-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transfer.component.html',
  styles: ``
})
export class TransferComponent {
  fromAccountNumber: string = '';
  toAccountNumber: string = '';
  amount: number = 0;
  successMessage: string = '';
  errorMessage: string = '';




  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}


  onSubmit(): void {
    if (this.fromAccountNumber === this.toAccountNumber) {
    this.errorMessage = "Cannot transfer to the same account";
    return;
  }

    const request: TransferRequest = {
      fromAccountNumber: this.fromAccountNumber,
      toAccountNumber: this.toAccountNumber,
      amount: this.amount
    };

  this.accountService.transfer(request).subscribe({
    next: () => {
      this.successMessage = "Transfer completed successfully";
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/accounts']);
      }, 1500);
    },
    error: (err) => {
      this.errorMessage = err.error?.detail || "Transfer failed";
      this.successMessage = '';
    }
  });


  }
}
