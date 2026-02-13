import { Component } from '@angular/core';
import { Account } from '../model/account';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {

  accountNumber: string = '';
  account: Account = new Account();
  isLoaded: boolean = false;

  constructor(private route: ActivatedRoute,private accountService: AccountService,private router: Router) {}


  ngOnInit(): void {
    this.accountNumber= String(this.route.snapshot.paramMap.get('accountNumber'));
    this.accountService.getAccountById(this.accountNumber).subscribe(data => {
      this.account = data;
      this.isLoaded = true;
    });
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }
}
