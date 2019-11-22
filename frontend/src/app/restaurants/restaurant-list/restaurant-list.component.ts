import { Component, OnInit } from '@angular/core';

import { Restaurant } from '../restaurant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private actr: ActivatedRoute) {
    this.actr.data
    .subscribe( res => {
      this.restaurants = res.cres;
    });
  }

  ngOnInit() {
    console.log(this.restaurants);
  }

}
