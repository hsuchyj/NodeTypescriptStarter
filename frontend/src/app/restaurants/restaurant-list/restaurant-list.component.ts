import { Component, OnInit } from '@angular/core';

import { Restaurant } from '../restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[];
  leftColumn: Restaurant[] = [];
  rightColumn: Restaurant[] = [];
  centerColumn: Restaurant[] = [];

  constructor(private actr: ActivatedRoute, private restaurantService: RestaurantService) {
    this.actr.data
    .subscribe( res => {
      this.restaurants = res.restaurants;
      this.restaurantService.setRestaurants(res.restaurants);
      for(let i = 0; i < this.restaurants.length; i++) {
        let j = i % 3;
        if(j === 0) {
          this.leftColumn.push(this.restaurants[i]);
        }
        else if(j === 1) {
          this.centerColumn.push(this.restaurants[i]);
        }
        else if(j === 2) {
          this.rightColumn.push(this.restaurants[i]);
        }
      }
    });
  }

  ngOnInit() {
  }

}
