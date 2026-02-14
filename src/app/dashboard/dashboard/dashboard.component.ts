import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { Dashboard } from '../../model/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
data!: Dashboard;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {

    forkJoin({
      activeAccounts: this.accountService.getAllAccounts(),
      allAccounts: this.accountService.getAllAccountsIncludingClosed(),
      pending: this.accountService.getPendingTransactions(),
      clerks: this.accountService.getClerks()
    }).subscribe(res => {

      const totalBalance = res.activeAccounts
        .reduce((sum, acc) => sum + acc.balance, 0);

      this.data = {
        totalActiveAccounts: res.activeAccounts.length,
        totalClosedAccounts: res.allAccounts.length - res.activeAccounts.length,
        totalClerks: res.clerks.length,
        pendingWithdrawals: res.pending.length,
        totalBankBalance: totalBalance
      };

    });

  }
}
