import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core'
import { AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: any;
  map: google.maps.Map;
  constructor(public sharedSvc:TestService ) { }

  ngAfterViewInit(): void {
    // Load google maps script after view init
    const DSLScript = document.createElement('script');
    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=hahanotforu'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
  }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  onClick() {
    this.sharedSvc.sharedValue++;
  }

}

