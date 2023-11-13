import { Component , OnInit} from '@angular/core';
import {InvestorService} from '../services/investor.service';
import {NotesService} from '../services/notes.service';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-crm-summary',
  templateUrl: './crm-summary.component.html',
  styleUrls: ['./crm-summary.component.scss']
})
export class CrmSummaryComponent implements OnInit{
  notesCount: number;
  investorsCount: number;
  playersCount: number;
  totalInvested: number;

  constructor(
    private notesService: NotesService,
    private playerService: PlayerService,
    private investorService: InvestorService
  ) {}

  ngOnInit(): void {
    this.getNotesCount();
    this.getInvestorsCount();
    this.getPlayersCount();
    this.getTotalInvested();
  }

  getNotesCount() {
    this.notesService.getNotesCount().subscribe(count => {
      this.notesCount = count;
    });
  }

  getInvestorsCount() {
    this.investorService.getChartData().subscribe(investors => {
      this.investorsCount = investors.length;
    });
  }

  getPlayersCount() {
    this.playerService.getPlayersWithEarnings().subscribe(players => {
      this.playersCount = players.length;
    });
  }

  getTotalInvested() {
    this.investorService.getChartData().subscribe(investors => {
      this.totalInvested = investors.reduce((acc, investor) => acc + Number(investor.investedAmount), 0);
    });
  }

}
