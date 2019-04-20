import { Component, OnInit } from '@angular/core';
import {ChartService} from './chart.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers:[ChartService],
})
export class ChartComponent implements OnInit {

  constructor(chart: ChartService) { }

  ngOnInit() {
  }

}
