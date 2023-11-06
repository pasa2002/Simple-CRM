import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DialoagAddUserComponent } from './dialoag-add-user/dialoag-add-user.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatMenuModule} from '@angular/material/menu';
import { DialogEditAdressComponent } from './dialog-edit-adress/dialog-edit-adress.component';
import { EditDialogUserComponent } from './edit-dialog-user/edit-dialog-user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Auth, getAuth } from '@firebase/auth';
import { HeaderSidebarComponent } from './header-sidebar/header-sidebar.component';
import { MainComponent } from './main/main.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideAuth } from '@angular/fire/auth';
import { NewsComponent } from './news/news.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {HttpClientModule} from '@angular/common/http'
import { CustomerComponent } from './customer/customer.component';
import { NotesComponent } from './notes/notes.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { NewsapiserviceService } from './services/newsapiservice.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { EditDialogNotesComponent } from './edit-dialog-notes/edit-dialog-notes.component';
import { PlayerAddEditComponent } from './player-add-edit/player-add-edit.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { PlayerEarningChartComponent } from './player-earning-chart/player-earning-chart.component';
import { CoachExperienceChartComponent } from './coach-experience-chart/coach-experience-chart.component';
import { TodoSummaryComponent } from './todo-summary/todo-summary.component';
import { NewsSummaryComponent } from './news-summary/news-summary.component';




@NgModule({
  declarations: [AppComponent, DashboardComponent, UserComponent, DialoagAddUserComponent, UserDetailComponent, DialogEditAdressComponent, EditDialogUserComponent, LoginComponent, SignupComponent, HeaderSidebarComponent, MainComponent, NewsComponent, CustomerComponent, NotesComponent, NotesDialogComponent, EditDialogNotesComponent, PlayerAddEditComponent, PlayerDetailComponent, EditPlayerComponent, PlayerEarningChartComponent, CoachExperienceChartComponent, TodoSummaryComponent, NewsSummaryComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    provideFirebaseApp(
      ()=>initializeApp(environment.firebase)),
      provideFirestore(()=>getFirestore()),
      provideDatabase(()=>getDatabase()),
      provideAuth(()=>getAuth()),
    MatProgressBarModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireAuthModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    NgbModalModule,
    NgbModule,
    FlatpickrModule.forRoot(),
      HttpClientModule,
      MatRadioModule,
      MatSelectModule,
      HttpClientModule,
      MatTableModule,
      CanvasJSAngularChartsModule,

  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    NewsapiserviceService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
