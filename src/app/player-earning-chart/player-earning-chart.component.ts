import { Component, OnInit , ChangeDetectorRef , AfterViewInit} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-earning-chart',
  templateUrl: './player-earning-chart.component.html',
  styleUrls: ['./player-earning-chart.component.scss']
})
export class PlayerEarningChartComponent implements OnInit , AfterViewInit{

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // ... other options
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Player Earnings' },
      { data: [], label: 'Player Experience' }
    ]
  };

  constructor(private playerService: PlayerService,
    private cd: ChangeDetectorRef) {}


    ngAfterViewInit() {
      this.playerService.getPlayersWithEarnings().subscribe(players => {
        // ... set the chart data
        this.cd.detectChanges(); // Trigger change detection
      });
    }

ngOnInit() {
  this.playerService.getPlayersWithEarnings().subscribe(players => {
    console.log(players); // Check if players data is being logged
    this.barChartData.labels = players.map(player => player.name);
    this.barChartData.datasets[0].data = players.map(player => player.salary as number);
    this.barChartData.datasets[1].data = players.map(player => player.experience as number);
    this.cd.detectChanges();
  });
}
}
