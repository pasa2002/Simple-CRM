// investor.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {

  constructor(private firestore: AngularFirestore) {}

  // Function to get chart data
  getChartData(): Observable<any[]> {
    return this.firestore.collection<User>('users').valueChanges().pipe(
      map(users => users.map(user => {
        // Transform the data as needed for the chart
        return {
          name: `${user.firstName} ${user.lastName}`,
          investedAmount: user.investedAmount
        };
      }))
    );
  }
}
