import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../restaurant.model';
import { RestaurantService } from '../../restaurant.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {

  @Input() restaurant: Restaurant;
  @Input() index: string;
  constructor(private restaurantService: RestaurantService){
  }

  ngOnInit() {
  }

  onSelected() {
    this.restaurantService.restaurantSelected.emit(this.restaurant);
  }

}
