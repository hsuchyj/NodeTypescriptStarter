import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantReview } from './restaurant-reviews.model';

@Injectable({providedIn: 'root'})
export class ReviewsResolver implements Resolve<RestaurantReview[]> {

    constructor(private http: HttpClient) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.get('http://localhost:3000/api/reviews/all/all');
    }
}
