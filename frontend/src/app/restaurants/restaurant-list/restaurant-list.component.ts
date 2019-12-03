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

  constructor(private actr: ActivatedRoute, private restaurantService: RestaurantService) {
    this.actr.data
    .subscribe( res => {
      this.restaurants = res.restaurants;
      this.restaurantService.setRestaurants(res.restaurants);
    });
  }

  ngOnInit() {
  }

}
