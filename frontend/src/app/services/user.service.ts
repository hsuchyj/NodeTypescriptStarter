import { IUser, UserModel as User } from '../../../../backend/src/models/userModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Restaurant, { IRestaurant } from '../../../../backend/src/models/restaurantModel';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: IUser) {
        return this.http.post(`http://localhost:3000/api/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:3000/api/users/${id}`);
    }

    addRestaurant(restaurant: IRestaurant) {
        return this.http.post(`http://localhost:3000/api/restaurants`, restaurant);
    }
}
