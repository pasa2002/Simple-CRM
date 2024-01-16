/**
 * Represents the CRM summary component.
 * This component is responsible for displaying summary information
 * about notes, investors, players, and total invested amount.
 */

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
  /**
   * Constructs the CRM summary component.
   * @param notesService Service to handle operations related to notes.
   * @param playerService Service to handle operations related to players.
   * @param investorService Service to handle operations related to investors.
   */
  constructor(
    private notesService: NotesService,
    private playerService: PlayerService,
    private investorService: InvestorService
  ) {}

   /**
   * Initializes the component by loading all necessary data.
   */
  ngOnInit(): void {
    this.getNotesCount();
    this.getInvestorsCount();
    this.getPlayersCount();
    this.getTotalInvested();
  }
  /**
   * Retrieves the count of notes.
   */
  getNotesCount() {
    this.notesService.getNotesCount().subscribe(count => {
      this.notesCount = count;
    });
  }
  /**
   * Retrieves the count of investors.
   */
  getInvestorsCount() {
    this.investorService.getChartData().subscribe(investors => {
      this.investorsCount = investors.length;
    });
  }
  /**
   * Retrieves the count of players.
   */
  getPlayersCount() {
    this.playerService.getPlayersWithEarnings().subscribe(players => {
      this.playersCount = players.length;
    });
  }
  /**
   * Retrieves the total amount invested
   */
  getTotalInvested() {
    this.investorService.getChartData().subscribe(investors => {
      this.totalInvested = investors.reduce((acc, investor) => acc + Number(investor.investedAmount), 0);
    });
  }

}
