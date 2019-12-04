import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestaurantService } from '../../restaurant.service';
import { Review } from '../reviews/review.model';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {

  reviewForm: FormGroup;
  @Input() restaurantId: string;
  @Input() restaurant: string;
  newReview: boolean;

  constructor(private restaurantService: RestaurantService) {
    this.initForm();
    this.restaurantService.restaurantSelected.subscribe( () => {
      this.newReview = false;
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    const userId: string = JSON.parse(localStorage.getItem('currentUser')).user._id;
    const token: string = JSON.parse(localStorage.getItem('currentUser')).token;

    console.log(userId);
    console.log(token);

    console.log(this.reviewForm.value.food);
    const myReview = new Review(new Date(), this.reviewForm.value.text, {
      overall: this.reviewForm.value.overall,
      food: this.reviewForm.value.food,
      service: this.reviewForm.value.service,
      drinksAndBar: this.reviewForm.value.drinksAndBar,
      specialsAndHappyHour: this.reviewForm.value.specialsAndHappyHour,
      music: this.reviewForm.value.music,
      price: this.reviewForm.value.price,
      restrooms: this.reviewForm.value.restrooms,
    }, userId);

    this.restaurantService.addReview(myReview, this.restaurantId, token);

    this.reviewForm.reset();
    this.newReview = !this.newReview;
  }

  onNewReview() {
    this.newReview = !this.newReview;
  }

  private initForm() {
    this.reviewForm = new FormGroup({
      text: new FormControl(),
      overall: new FormControl(),
      food: new FormControl(),
      service: new FormControl(),
      price: new FormControl(),
      restrooms: new FormControl(),
      drinksAndBar: new FormControl(),
      specialsAndHappyHour: new FormControl(),
      music: new FormControl()
    });
  }

}
