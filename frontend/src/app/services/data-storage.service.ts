import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Restaurant } from '../restaurants/restaurant.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private restaurantService: RestaurantService) {}

}
