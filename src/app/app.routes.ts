import { Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { PendingComponent } from './pending-component/pending-component.component';
import { ClerkManagementComponent } from './clerk-management/clerk-management/clerk-management.component';
export const routes: Routes = [
   { path: 'login', component: LoginComponent },

  { path: 'accounts', component: AccountListComponent, canActivate: [authGuard]  },
  { path: 'account-details/:accountNumber', component: AccountDetailsComponent,canActivate: [authGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [authGuard] },
  { path: 'update-account/:accountNumber', component: UpdateAccountComponent, canActivate: [authGuard] },
   { path: 'deposit', component: DepositComponent, canActivate: [authGuard] },
   { path: 'withdraw', component: WithdrawComponent, canActivate: [authGuard] },
   { path: 'transfer', component: TransferComponent,canActivate: [authGuard] },
{ path: 'pending', component: PendingComponent, canActivate: [authGuard] },
{ path: 'history/:accountNumber', component: TransactionHistoryComponent, canActivate: [authGuard] },
{ path: 'clerks', component: ClerkManagementComponent, canActivate: [authGuard] },


  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
