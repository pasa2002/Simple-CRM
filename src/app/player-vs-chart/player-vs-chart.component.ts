import { Component , OnInit} from '@angular/core';
import { BasketballService } from '../services/basketball.service';

import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-player-vs-chart',
  templateUrl: './player-vs-chart.component.html',
  styleUrls: ['./player-vs-chart.component.scss']
})
export class PlayerVsChartComponent implements OnInit{
  playerForm: FormGroup;
  allPlayers: any[] = [];
  filteredPlayers: Observable<any[]>[] = [];

  constructor(
    private fb: FormBuilder,
    private basketballService: BasketballService
  ) {
    this.playerForm = this.fb.group({
      players: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addPlayerInput();

    this.basketballService.getAllPlayers().subscribe(players => {
      this.allPlayers = players;
      console.log(this.allPlayers)
      this.updateFilteredPlayers(0);
    });
  }

  get players(): FormArray {
    return this.playerForm.get('players') as FormArray;
  }

  private addPlayerInput() {
    const playerControl = new FormControl();

    this.players.push(playerControl);

    const index = this.players.length - 1;
    this.filteredPlayers[index] = playerControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any): any[] { // Changed the type to any to handle non-string values
    if (typeof value !== 'string') {
      // If the value is not a string, return an empty array or handle accordingly
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.allPlayers.filter(player => {
      const firstName = player.first_name || '';
      const lastName = player.last_name || '';
      return firstName.toLowerCase().includes(filterValue) ||
             lastName.toLowerCase().includes(filterValue);
    });
  }

  displayFn(player: any): string {
    return player && player.first_name && player.last_name ? `${player.first_name} ${player.last_name}` : '';
  }



  updateFilteredPlayers(index: number) {
    this.filteredPlayers[index] = this.players.at(index).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  addPlayerField() {
    this.addPlayerInput();
    this.updateFilteredPlayers(this.players.length - 1);
  }
}
