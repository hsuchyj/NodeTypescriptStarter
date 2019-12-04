import { Component, OnInit, Input } from '@angular/core';
import { IUser, UserModel as User } from '..../../../backend/src/models/userModel';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { RestaurantService } from '../../restaurants/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [RestaurantService]
})
export class MenuComponent implements OnInit {
  currentUser: IUser;

  @Input() activeClass='active';
  loggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private restaurantService: RestaurantService
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
    this.resetSelected();
  }

  resetSelected(){
    this.restaurantService.resetSelected();
  }

}
