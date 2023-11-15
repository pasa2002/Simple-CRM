import { Component, HostListener , ViewChild, Renderer2, OnDestroy} from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy{
  opened = true;
  isScreenSmall = false;
  @ViewChild('drawer') drawer: MatDrawer;
  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private renderer: Renderer2,
    private renderer2: Renderer2,
    private breakpointObserver: BreakpointObserver
  ) {
    this.checkScreenSize();
    this.toggleBodyScroll(window.innerWidth <= 700 && this.opened);
    this.breakpointObserver.observe([
      Breakpoints.XSmall // This corresponds to less than 600px width
    ]).subscribe(result => {
      if (result.matches) {
        this.opened = false; // Close the drawer on small screens
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
    this.toggleBodyScroll(window.innerWidth <= 700 && this.opened);
  }

  private checkScreenSize() {
    this.isScreenSmall = window.innerWidth <= 700;
    this.opened = !this.isScreenSmall;
    this.toggleBodyScroll(this.opened && this.isScreenSmall);
  }

  toggleDrawer() {
    this.drawer.toggle(); // This will open/close the drawer
    this.toggleBodyScroll(this.drawer.opened && window.innerWidth <= 700);
  }


  private toggleBodyScroll(shouldHideOverflow: boolean) {

      document.body.style.overflow = shouldHideOverflow ? 'hidden' : '';
    }


    ngOnDestroy() {
      // Make sure to remove the class when the component is destroyed
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }


  logOut() {
    this.authService.logout()
      .pipe(
        this.toast.observe({
          success: 'Logged out successfully',
          loading: 'Logging out...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  navigateAndCloseDrawer(path: string) {
    this.router.navigate([path]).then(() => {
      if (window.innerWidth <= 700) {
        this.drawer.close();
        this.toggleBodyScroll(false);
      }
    });
  }
}
