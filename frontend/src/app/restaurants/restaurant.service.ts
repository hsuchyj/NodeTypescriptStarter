import { Restaurant } from './restaurant.model';
import { Injectable, EventEmitter } from '@angular/core';
import { RestaurantReview } from './restaurant-reviews-list/restaurant-reviews.model';

@Injectable({providedIn: 'root'})
export class RestaurantService {

    private restaurants: Restaurant[];
    private reviews: any[];

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

    setReviews(reviews: RestaurantReview[]) {
        this.reviews = reviews;
    }

    getReviews() {
        return this.reviews;
    }

}
