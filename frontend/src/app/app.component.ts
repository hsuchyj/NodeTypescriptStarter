import { Component } from '@angular/core';
import { IUser, UserModel as User } from '../../../backend/src/models/userModel';
import { AuthenticationService } from "./services/authentication.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: IUser;
  title = 'UDelp Food Reviews';
}
