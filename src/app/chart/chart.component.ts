import { Component, OnInit,NgZone } from '@angular/core';
import {ChartService} from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers:[ChartService],
})
export class ChartComponent  {
  graphUrl = '';
  graphtype ='';
  //datagraph = [];
  constructor(private chart: ChartService, private zone: NgZone) { }

  chartType(graphtype : string){
    this.graphtype = graphtype;
    console.log(this.graphtype);
  }
  onEnter(graphUrl: string) {
    this.graphUrl = graphUrl;

    this.zone.runOutsideAngular(() => {
      this.chart.createChart();
      this.chart.setDataSource(this.graphUrl);
      this.chart.precision();
      this.chart.createAxes();
      console.log(this.graphtype);
      this.chart.createSeries(this.graphtype);
      this.chart.addCursor();
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
