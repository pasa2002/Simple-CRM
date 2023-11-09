import { Component, HostListener , ViewChild, Renderer2, OnDestroy} from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  opened = true;
  @ViewChild('drawer') drawer: MatDrawer;
  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private renderer: Renderer2
  ) {
    this.checkScreenSize();
    this.toggleBodyScroll(window.innerWidth <= 700 && this.opened);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
    this.toggleBodyScroll(window.innerWidth <= 700 && this.opened);
  }

  private checkScreenSize() {
    const isScreenSmall = window.innerWidth <= 700;
    this.opened = !isScreenSmall;
    this.toggleBodyScroll(this.opened && isScreenSmall);
  }

  toggleDrawer() {
    this.opened = !this.opened;
    this.toggleBodyScroll(this.opened && window.innerWidth <= 700);
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
      if (window.innerWidth <= 1500) {
        this.opened = false; // This should update the binding and close the drawer
        // If the above line doesn't work as expected, try using the drawer reference directly:
        this.drawer.close();
      }
    });
  }
}
