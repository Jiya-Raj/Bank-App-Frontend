import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { TransferRequest } from '../model/transfer-request';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './transfer.component.html',
  styles: `
   .transfer-card {
  width: 420px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.transfer-header {
  background-color: #0B1F33;
  color: white;
  padding: 12px;
  border-radius: 12px;
}

/* Inputs */
.custom-input {
  border-radius: 8px;
  padding: 8px 12px;
}

.custom-input:focus {
  border-color: #4E6784;
  box-shadow: 0 0 0 0.15rem rgba(78, 103, 132, 0.25);
}

/* Validation */
.validation-text {
  font-size: 12px;
  color: #7a8fa8;
  margin-top: 4px;
}

/* Alerts */
.custom-alert {
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.success-alert {
  background-color: #e6edf4;
  color: #0B1F33;
}

.error-alert {
  background-color: #f1f3f5;
  color: #2c3e50;
}

/* Submit Button */
.btn-warm-create {
  background-color: #1F2F4A;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-warm-create:hover:not(:disabled) {
  background-color: #0B1F33;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
}

.btn-warm-create:disabled {
  background-color: #b0b8c2;
  cursor: not-allowed;
}
  `
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
