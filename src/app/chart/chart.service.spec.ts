import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartService = TestBed.get(ChartService);
    expect(service).toBeTruthy();
  });
});
