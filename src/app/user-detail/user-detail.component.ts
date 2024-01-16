import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { EditDialogUserComponent } from '../edit-dialog-user/edit-dialog-user.component';

/**
 * Component for displaying user details.
 */
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  /**
   * Constructor for UserDetailComponent.
   * @param route - The ActivatedRoute for retrieving route parameters.
   * @param fireStore - The AngularFirestore service for interacting with Firestore.
   * @param dialog - The MatDialog service for opening dialogs.
   */
  constructor(
    private route: ActivatedRoute,
    private fireStore: AngularFirestore,
    public dialog: MatDialog
  ){}

  /** User ID obtained from route parameter. */
  userId = "";

  /** User object for displaying user details. */
  user: User = new User();

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Fetches user data from Firestore based on the user ID.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');

      this.getUser();
    });
  }

  /**
   * Fetches user data from Firestore.
   */
  getUser(): void {
    this.fireStore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
      });
  }

  /**
   * Opens a dialog for editing user address.
   */
  editMenu(): void {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  /**
   * Opens a dialog for editing user details.
   */
  editUserDetail(): void {
    const dialog = this.dialog.open(EditDialogUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
