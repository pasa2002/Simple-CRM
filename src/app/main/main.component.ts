import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public authService:AuthService
    , private router:Router,
    private toast: HotToastService,){}

  logOut(){
    this.authService.logout()
    .pipe(
      this.toast.observe({
        success: 'Logged out successfully',
        loading: 'Logging out...',
        error: ({ message }) => `There was an error: ${message} `,
      })
    )
    .subscribe(()=>{

      this.router.navigate(['/login'])
    })
  }
}
