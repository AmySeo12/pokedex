import { Component, Inject } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { DOCUMENT } from '@angular/platform-browser';
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'my-app';
  currentUser: User;
  show:boolean;
  
      constructor(
          private router: Router,
          private authenticationService: AuthenticationService,
          @Inject(DOCUMENT) document: any
      ) {
          this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      }
  
      logout() {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
      }

      ngOnInit() {
        var url= document.location.href
        console.log(url);
        if(url.includes('/pokemon')){
            this.show= false;
        }else{
            this.show=true;
        }
      }
      getAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
      }
}
