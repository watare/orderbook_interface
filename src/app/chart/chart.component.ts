import { Component, OnInit,NgZone } from '@angular/core';
import {ChartService} from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers:[ChartService],
})
export class ChartComponent  {

  constructor(private chart: ChartService, private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.chart.createChart();
      this.chart.setDataSource("/assets/data_poloniex.json");
      this.chart.setTheRest();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.disposeChart();

      }
    });
  }
}
