import { Review } from './reviews/review.model';

export class RestaurantReview {

    constructor(public reviews: Review[],
                public alias: string,
                public restaurantId: string){

    }
}