import { Injectable } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  chart :any;
  constructor() {

  }

  disposeChart(){
    this.chart.dispose;
  }


  createChart(){
    // Create chart instance
    this.chart = am4core.create("chartservice", am4charts.XYChart);
  }
  // Add data
  setDataSource(datasource: any){
    this.chart.dataSource.url = datasource //"https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=50";
    this.chart.dataSource.reloadFrequency = 30000;
    this.chart.dataSource.adapter.add("parsedData",(data) => this.adapter(data));
  }

  chartlog(){
    console.log("toto");
  }

  convertDataPoint(list){
    // Convert to data points
    for(var i = 0; i < list.length; i++) {
      list[i] = {
        value: Number(list[i][0]),
        volume: Number(list[i][1]),
      }
    }

    // Sort list just in case
    list.sort(function(a, b) {
      if (a.value > b.value) {
        return 1;
      }
      else if (a.value < b.value) {
        return -1;
      }
      else {
        return 0;
      }
    });
  }

  calculateVolume(list,type,desc,res){
    // Calculate cummulative volume
    if (desc) {
      for(var i = list.length - 1; i >= 0; i--) {
        if (i < (list.length - 1)) {
          list[i].totalvolume = list[i+1].totalvolume + list[i].volume;
        }
        else {
          list[i].totalvolume = list[i].volume;
        }
        let dp = {};
        dp["value"] = list[i].value;
        dp[type + "volume"] = list[i].volume;
        dp[type + "totalvolume"] = list[i].totalvolume;


        res.unshift(dp);
      }
    }
    else {
      for(var i = 0; i < list.length; i++) {
        if (i > 0) {
          list[i].totalvolume = list[i-1].totalvolume + list[i].volume;
        }
        else {
          list[i].totalvolume = list[i].volume;
        }
        let dp = {};
        dp["value"] = list[i].value;
        dp[type + "volume"] = list[i].volume;
        dp[type + "totalvolume"] = list[i].totalvolume;
        res.push(dp);
      }
    }
  }
  processData(list, type, desc,res) {
    this.convertDataPoint(list);
    this.calculateVolume(list,type,desc,res);
  }


  adapter(data) {
  // Function to process (sort and calculate cummulative volume)

  // Init
  let res = [];
  this.processData(data.bids, "bids", true,res);
  this.processData(data.asks, "asks", false,res);
  return res;

  }


  setTheRest(){
    this.precision();
    this.createAxes();
    this.createSeries();
    this.addCursor();
  }
  precision(){
    // Set up precision for numbers
    this.chart.numberFormatter.numberFormat = "#,###.####";
  }

  createAxes(){
    // Create axes
    let xAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "value";
    //xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 50;
    xAxis.title.text = "Price (BTC/ETH)";

    let yAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = "Volume";
  }

  createSeries(){
    // Create series
    let series = this.chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.categoryX = "value";
    series.dataFields.valueY = "bidstotalvolume";
    series.strokeWidth = 2;
    series.stroke = am4core.color("#0f0");
    series.fill = series.stroke;
    series.fillOpacity = 0.1;
    series.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]"

    let series2 = this.chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.categoryX = "value";
    series2.dataFields.valueY = "askstotalvolume";
    series2.strokeWidth = 2;
    series2.stroke = am4core.color("#f00");
    series2.fill = series2.stroke;
    series2.fillOpacity = 0.1;
    series2.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]"

    let series3 = this.chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.categoryX = "value";
    series3.dataFields.valueY = "bidsvolume";
    series3.strokeWidth = 0;
    series3.fill = am4core.color("#000");
    series3.fillOpacity = 0.2;

    let series4 = this.chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.categoryX = "value";
    series4.dataFields.valueY = "asksvolume";
    series4.strokeWidth = 0;
    series4.fill = am4core.color("#000");
    series4.fillOpacity = 0.2;
  }

  addCursor(){
    // Add cursor
    this.chart.cursor = new am4charts.XYCursor();

  }

}
