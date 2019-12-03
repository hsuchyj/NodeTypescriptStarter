import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({ templateUrl: 'add-restaurant.component.html' })
export class AddRestaurantComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to login if not authenticated
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            alias: ['', Validators.required],
            name: ['', Validators.required],
            image_url: [''],
            review_count: [0],
            categories: this.formBuilder.group({
                alias: [''],
                title: ['', Validators.required]
            }),
            transactions: ['', Validators.required],
            rating: [0],
            coordinates: this.formBuilder.group({
                latitude: [39.6831160056787],
                longitude: [-75.7462319320131]
            }),
            location: this.formBuilder.group({
                display_address: this.formBuilder.group({
                    address1: ['', Validators.required],
                    address2: ['', Validators.required]
                })
            }),
            phone: ['+15555555555'],
            display_phone: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;



        this.userService.addRestaurant(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Restaurant added successfully', true);
                    this.router.navigate(['/restaurants']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
