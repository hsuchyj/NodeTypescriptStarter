import { Component, OnInit, Input } from '@angular/core';
import { IUser, UserModel as User } from '..../../../backend/src/models/userModel';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser: IUser;

  @Input() activeClass='active';
  loggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.loggedIn = true;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.loggedIn = false;
  }

  ngOnInit() {
  }

}
