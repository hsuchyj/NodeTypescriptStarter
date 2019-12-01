import { Restaurant } from './restaurant.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RestaurantService {
    private restaurants: Restaurant[] = [];
}