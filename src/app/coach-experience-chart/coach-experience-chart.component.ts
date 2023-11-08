import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { InvestorService } from '../services/investor.service';
@Component({
  selector: 'app-coach-experience-chart',
  templateUrl: './coach-experience-chart.component.html',
  styleUrls: ['./coach-experience-chart.component.scss']
})
export class CoachExperienceChartComponent implements OnInit{

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
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Invested Amount' }
      // Pie chart typically only have one dataset
    ]
  };

  constructor(private investorService: InvestorService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.investorService.getChartData().subscribe(chartData => {
      // Here you would set up your chart with the `chartData`
      // For example, if using Chart.js:
      this.pieChartData = {
        labels: chartData.map(data => data.name),
        datasets: [{
          data: chartData.map(data => data.investedAmount),
          label: 'Invested Amount'
        }]
      };
      // Initialize your chart here with this.chartData
    });
  }

}
