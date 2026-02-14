import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { WithdrawRequest } from '../model/withdraw-request';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './withdraw.component.html',
  styleUrl:'./withdraw.component.css'
})
export class WithdrawComponent {

  accountNumber:string='';
  amount: number = 0;
 successMessage: string = '';
errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}


  onSubmit(): void {
    const request: WithdrawRequest = {
      accountNumber: this.accountNumber,
      amount: this.amount
    };


    this.accountService.withdraw(request).subscribe({
    next: (response) => {
      if (response.status === 'SUCCESS') {
        this.successMessage = "Withdrawal successful!";
      } else if (response.status === 'PENDING_APPROVAL') {
        this.successMessage = "Withdrawal request submitted for manager approval.";
      }

      setTimeout(() => {
        this.router.navigate(['/accounts']);
      }, 1500);
    },
    error: (err) => {
      this.errorMessage = err.error?.detail || "Withdrawal failed";
    }
  });
}
}
