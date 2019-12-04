import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.model';
import { Review } from './restaurant-reviews-list/reviews/review.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  providers: [RestaurantService]
})
export class RestaurantsComponent implements OnInit {

  selectedRestaurant: Restaurant;

  constructor(private restaurantService: RestaurantService, private router: Router) {
   }

  ngOnInit() {
    this.restaurantService.restaurantSelected.subscribe(
      (restaurant: Restaurant) => {
        this.selectedRestaurant = restaurant;
      }
    );
  }

  getReviews(): Review[] {
    let result: Review[];
    this.restaurantService.getReviews().forEach( value => {
      if (this.selectedRestaurant.alias === value.alias) {
        result = value.reviews;
      }
    });
    return result;
  }

}
