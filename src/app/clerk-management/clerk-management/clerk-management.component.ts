import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ClerkRequest } from '../../model/clerk-request';
@Component({
  selector: 'app-clerk-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clerk-management.component.html',
  styleUrl: './clerk-management.component.css'
})
export class ClerkManagementComponent {
  clerks: string[] = [];
  newClerk: ClerkRequest = { username: '', password: '' };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadClerks();
  }

  loadClerks() {
    this.accountService.getClerks().subscribe({
      next: data => this.clerks = data,
      error: err => console.log(err)
    });
  }

  createClerk() {
    this.accountService.createClerk(this.newClerk).subscribe({
      next: () => {
        this.successMessage = "Clerk created successfully";
        this.errorMessage = '';
        this.newClerk = { username: '', password: '' };
        this.loadClerks();
      },
      error: err => {
        this.errorMessage = err.error?.detail || "Creation failed";
        this.successMessage = '';
      }
    });
  }

  deleteClerk(username: string) {
    if (!confirm("Delete this clerk?")) return;

    this.accountService.deleteClerk(username).subscribe({
      next: () => {
        this.successMessage = "Clerk deleted";
        this.loadClerks();
      },
      error: err => {
        this.errorMessage = err.error?.detail || "Delete failed";
      }
    });
  }
}
