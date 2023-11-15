import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  user: User = new User();
  allUsers = [];
  investedAmount: number;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('users', (ref) => ref.orderBy('investedAmount'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  ngAfterViewInit(): void {}

  openDialog() {
    this.dialog.open(DialoagAddUserComponent);
  }

  deleteUser(event: Event, user: any): void {
    // Prevent event propagation
    event.stopPropagation();

    // Delete the user from Firestore
    this.firestore
      .collection('users')
      .doc(user.customIdName)
      .delete()
      .then(() => {
        // On successful deletion from Firestore, delete the user from the local list
        const index = this.allUsers.indexOf(user);
        if (index > -1) {
          this.allUsers.splice(index, 1);
        }
      })
      .catch((error) => {
        console.error('Error deleting user: ', error);
      });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
