import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../restaurant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { Review } from './reviews/review.model';

@Component({
  selector: 'app-restaurant-reviews-list',
  templateUrl: './restaurant-reviews-list.component.html',
  styleUrls: ['./restaurant-reviews-list.component.css']
})
export class RestaurantReviewsListComponent implements OnInit {

  @Input() restaurant: Restaurant;
  @Input() reviews: Review[];

  constructor(private actr: ActivatedRoute, private restaurantService: RestaurantService, private router: Router) {
    this.actr.data
    .subscribe( res => {
      this.restaurantService.setReviews(res.reviews);
    });
  }

  ngOnInit() {
  }

  close() {
    this.restaurantService.close();
    this.router.navigate(['/restaurants']);
  }

}
