import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(private http: HttpClient) { }

  downloadPDF() {
    const pdfUrl = '../../assets/basketball_crm.pdf'; // Replace with your PDF URL
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'basketball_crm.pdf'; // Change the filename if needed
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
