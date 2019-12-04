import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ReviewsComponent } from './restaurants/restaurant-reviews-list/reviews/reviews.component';
import { RestaurantReviewsListComponent } from './restaurants/restaurant-reviews-list/restaurant-reviews-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './error.interceptor';

//import Angular material things
import {
  MatToolbarModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NewReviewComponent } from './restaurants/restaurant-reviews-list/new-review/new-review.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { SearchPipe } from './search.pipe.service';
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
    ReviewsComponent,
    RestaurantReviewsListComponent,
    LoginComponent,
    RegisterComponent,
    NewReviewComponent,
    AddRestaurantComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
