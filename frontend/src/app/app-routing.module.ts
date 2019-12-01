import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantResolver } from './restaurants/restaurant-resolver';
//import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user', component: ProfileComponent},
  {path: 'restaurants', component: RestaurantsComponent, resolve: { cres: RestaurantResolver }},
  //{path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RestaurantResolver]
})
export class AppRoutingModule { }
