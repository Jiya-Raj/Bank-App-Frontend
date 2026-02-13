import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {

  accountNumber: string = '';
  transactions: Transaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountNumber = String(this.route.snapshot.paramMap.get('accountNumber'));
    this.loadHistory();
  }

  loadHistory() {
    this.accountService.getTransactionHistory(this.accountNumber)
      .subscribe(data => {
        this.transactions = data;
      });
  }
}
