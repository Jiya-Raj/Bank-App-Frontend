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
  styles: ``
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
