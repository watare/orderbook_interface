import { Component,OnInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
am4core.useTheme(am4themes_animated);

interface Course {
    description: string;
    courseListIcon:string;
    iconUrl:string;
    longDescription:string;
    url:string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})


export class AppComponent {
  public title: string;
  private chart: am4charts.XYChart;
   courses$: Observable<Course[]>;

  constructor(private zone: NgZone, private httpclient:HttpClient ) {
    this.title="alibaba";
  }

  //function to send get request
   getWall(){
    console.log("toto");
  };

  ngAfterViewInit() {


  }

  ngOnDestroy() {
  
  }
}
