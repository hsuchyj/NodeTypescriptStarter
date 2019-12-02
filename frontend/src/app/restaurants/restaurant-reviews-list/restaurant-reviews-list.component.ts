import { Component, OnInit, Input } from '@angular/core';
import { Review } from './review.model';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant-reviews-list',
  templateUrl: './restaurant-reviews-list.component.html',
  styleUrls: ['./restaurant-reviews-list.component.css']
})
export class RestaurantReviewsListComponent implements OnInit {

  @Input() restaurant: Restaurant;

  reviews: Review[] = [ new Review('userID', new Date(), 'good stuff', {
    overall: 4,
    food: 4,
    drinksAndBar: 2,
    price: 3,
    service: 4,
    specialsAndHappyHour: 2,
    music: 3,
    restrooms: 3
  })];

  constructor() { }

  ngOnInit() {
  }

}
