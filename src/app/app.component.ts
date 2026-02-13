import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bankappclient';
  
   constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

   get role(): string | null {
    return this.authService.getUserRole();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
  return this.authService.isUserLoggedIn();
}

}
