import { Component } from '@angular/core';
import { AccountRequest } from '../model/account-request';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-account.component.html',
  styles: `
      .btn-warm-update {
      background-color: #7A8FA8;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      padding: 8px 16px;
      transition: all 0.2s ease-in-out;
    }

    .btn-warm-update:hover:not(:disabled) {
      background-color: #657b94;
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
    }

    .btn-warm-update:disabled {
      background-color: #b0b8c2;
      cursor: not-allowed;
    }

  `
})
export class UpdateAccountComponent {

  accountNumber: string = '';
  account:  AccountRequest = new AccountRequest();


  constructor(private route: ActivatedRoute,private accountService: AccountService, private router: Router) {}


  ngOnInit(): void {
    this.accountNumber = String(this.route.snapshot.paramMap.get('accountNumber'));
    this.accountService.getAccountById(this.accountNumber).subscribe(data => {
       this.account.name = data.name;
    });
  }

  onSubmit(): void {
    this.accountService.updateAccount(this.accountNumber, this.account).subscribe(() => {
      this.goToAccountList();
    });
  }

  goToAccountList(): void {
    this.router.navigate(['/accounts']);
  }
}
