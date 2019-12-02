import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantResolver } from './restaurants/restaurant-resolver.service';
import { RestaurantReviewsListComponent } from './restaurants/restaurant-reviews-list/restaurant-reviews-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'user', component: ProfileComponent},
  { path: 'restaurants', component: RestaurantsComponent, resolve: { cres: RestaurantResolver }, children: [
    { path: '', component: RestaurantsComponent },
    { path: ':id', component: RestaurantReviewsListComponent }
  ]}
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RestaurantResolver]
})
export class AppRoutingModule { }
