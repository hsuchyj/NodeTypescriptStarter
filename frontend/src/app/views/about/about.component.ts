import { Component, OnInit } from '@angular/core';
import { TestService }  from '../../services/test.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public sharedSvc:TestService) { }

  ngOnInit() {
  }

}
