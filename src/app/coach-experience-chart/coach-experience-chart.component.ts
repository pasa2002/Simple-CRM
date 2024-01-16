/**
 * Represents the Coach Experience Chart Component.
 * This component is responsible for displaying a pie chart
 * showing various aspects of the coach's experience.
 */

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { InvestorService } from '../services/investor.service';
@Component({
  selector: 'app-coach-experience-chart',
  templateUrl: './coach-experience-chart.component.html',
  styleUrls: ['./coach-experience-chart.component.scss']
})
export class CoachExperienceChartComponent implements OnInit{
  /**
   * Configuration options for the pie chart.
   * Includes responsiveness and legend settings.
   */
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {

          font: {
            size: 16
          },
          padding: 20,
        }
      },
    },
  };
  /** Type of chart, which in this case is a pie chart. */
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Invested Amount' }
      // Pie chart typically only have one dataset
    ]
  };
  /**
   * Constructs the Coach Experience Chart Component.
   * @param investorService Service to handle operations related to investors.
   * @param cd ChangeDetectorRef for managing change detection.
   */
  constructor(private investorService: InvestorService, private cd: ChangeDetectorRef) {}
 /**
   * Initializes the component by loading chart data.
   * Fetches data from the investorService and sets up the chart.
   */
  ngOnInit(): void {
    this.investorService.getChartData().subscribe(chartData => {

      this.pieChartData = {
        labels: chartData.map(data => data.name),
        datasets: [{
          data: chartData.map(data => data.investedAmount),
          label: 'Invested Amount'
        }]
      };
    });
  }

}
