import { Restaurant } from './restaurant.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Review } from './restaurant-reviews-list/review.model';

@Injectable({providedIn: 'root'})
export class RestaurantService {

    private restaurants: Restaurant[];
    private reviews: Review[];

    restaurantSelected = new EventEmitter<Restaurant>();

    getRestaurant(alias: string): Restaurant {
        let result: Restaurant;
        this.restaurants.forEach( (value: Restaurant) => {
            if (value.alias === alias) {
                result = value;
            }
        });
        return result;
    }

    setRestaurants(restaurants: Restaurant[]) {
        this.restaurants = restaurants;
    }
}
