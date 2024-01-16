import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

/**
 * Component for managing user data.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  /** User object for managing user data. */
  user: User = new User();

  /** Array to store all user data. */
  allUsers = [];

  /** Total invested amount. */
  investedAmount: number;

  /** Reference to MatSort for sorting user data. */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor for UserComponent.
   * @param dialog - The MatDialog service for opening dialogs.
   * @param firestore - The AngularFirestore service for interacting with Firestore.
   * @param _liveAnnouncer - The LiveAnnouncer service for announcing accessibility messages.
   */
  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Fetches user data from Firestore.
   */
  ngOnInit(): void {
    this.firestore
      .collection('users', (ref) => ref.orderBy('investedAmount'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  /**
   * Lifecycle hook that is called after the view is initialized.
   */
  ngAfterViewInit(): void {}

  /**
   * Opens a dialog for adding a new user.
   */
  openDialog() {
    this.dialog.open(DialoagAddUserComponent);
  }

  /**
   * Deletes a user from Firestore and the local list.
   * @param event - The click event.
   * @param user - The user to be deleted.
   */
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

  /**
   * Prevents event propagation.
   * @param event - The click event.
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Announces the change in sorting order.
   * @param sortState - The current sorting state.
   */
  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
