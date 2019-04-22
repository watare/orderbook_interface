import { Component, OnInit,NgZone } from '@angular/core';
import {ChartService} from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers:[ChartService],
})
export class ChartComponent  {
  values = '';
  datagraph = [];
  constructor(private chart: ChartService, private zone: NgZone) { }

  onEnter(values: string) {
    this.values = values;
    this.datagraph.push(this.values);

    this.zone.runOutsideAngular(() => {
      this.chart.createChart();
      this.chart.setDataSource(this.values);
      this.chart.setTheRest();
    });
   }


  ngDoCheck() {
    //this.datagraph.push()
  /*  this.zone.runOutsideAngular(() => {
      this.chart.createChart();
      this.chart.setDataSource(this.values);
      this.chart.setTheRest();
    });*/
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.disposeChart();

      }
    });
  }
}
