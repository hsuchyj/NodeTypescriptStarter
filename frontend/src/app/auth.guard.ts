import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService as AuthService} from './services/authentication.service'


@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean>|Promise<boolean>|boolean {

    const currentUser = this.authService.currentUserValue;
    const url: string = route.url.join('');

    if (currentUser) {
      //return true;

      console.log(url);

      if (url === 'login' || url === 'register'){
          this.router.navigate(['/home']);
      } else {
          return true;
      }
    }
    this.router.navigate(['/login']);
  }
}
