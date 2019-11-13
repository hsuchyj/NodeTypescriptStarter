import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public sharedSvc:TestService ) { }

  ngOnInit() {
  }

  onClick() {
    this.sharedSvc.sharedValue++;
  }

}
