import { Restaurant } from './restaurant.model';
import { Injectable, EventEmitter } from '@angular/core';
import { RestaurantReview } from './restaurant-reviews-list/restaurant-reviews.model';
import { HttpClient } from '@angular/common/http';
import { Review } from './restaurant-reviews-list/reviews/review.model';

@Injectable({providedIn: 'root'})
export class RestaurantService {

    private restaurants: Restaurant[];
    private reviews: any[];
    public isClosed: boolean = false;

    restaurantSelected = new EventEmitter<Restaurant>();

    constructor(private http: HttpClient) {}

    close() {
        this.isClosed = true;
    }

    open() {
        this.isClosed = false;
    }

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

    addReview(review: Review, restaurantId: string, token: string) {
        this.http.post('http://localhost:3000/api/reviews/' + restaurantId, {
            creatorId: review.creatorId,
            text: review.text,
            ratings: review.ratings
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).subscribe(
            () => {
                alert('review added');
            }
        );
    }

}
