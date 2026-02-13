import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-component.component.html'
})
export class PendingComponent {

  transactions: Transaction[] = [];
  message: string = '';
  selectedTransactionId: number | null = null;
actionType: 'approve' | 'reject' | null = null;


  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending() {
    this.accountService.getPendingTransactions()
      .subscribe(data => {
        this.transactions = data;
      });
  }

  approve(id: number) {
    if (!confirm("Approve this withdrawal?")) return;
    this.accountService.approveTransaction(id)
      .subscribe(() => {
        this.message = "Transaction approved";
        this.loadPending();
      });
  }

  reject(id: number) {
    if (!confirm("Reject this withdrawal?")) return;
    this.accountService.rejectTransaction(id)
      .subscribe(() => {
        this.message = "Transaction rejected";
        this.loadPending();
      });
  }

 openModal(id: number, action: 'approve' | 'reject') {
  this.selectedTransactionId = id;
  this.actionType = action;

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('confirmModal')
  );
  modal.show();
}

confirmAction() {
  if (!this.selectedTransactionId || !this.actionType) return;

  if (this.actionType === 'approve') {
    this.accountService.approveTransaction(this.selectedTransactionId)
      .subscribe(() => {
        this.message = "Transaction approved";
        this.loadPending();
      });
  } else {
    this.accountService.rejectTransaction(this.selectedTransactionId)
      .subscribe(() => {
        this.message = "Transaction rejected";
        this.loadPending();
      });
  }

  const modalElement = document.getElementById('confirmModal');
  const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

}
