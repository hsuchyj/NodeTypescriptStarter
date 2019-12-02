import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { RestaurantItemComponent } from './restaurants/restaurant-list/restaurant-item/restaurant-item.component';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from './restaurants/restaurant-reviews-list/reviews/reviews.component';
import { RestaurantReviewsListComponent } from './restaurants/restaurant-reviews-list/restaurant-reviews-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    ProfileComponent,
    SidebarComponent,
    RestaurantsComponent,
    RestaurantListComponent,
    RestaurantItemComponent,
    RestaurantDetailComponent,
    ReviewsComponent,
    RestaurantReviewsListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
