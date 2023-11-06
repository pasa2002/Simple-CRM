import { Component, OnInit } from '@angular/core';
import { NewsapiserviceService } from '../services/newsapiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-news-summary',
  templateUrl: './news-summary.component.html',
  styleUrls: ['./news-summary.component.scss']
})
export class NewsSummaryComponent implements OnInit {
  firstArticle: any;

  constructor(private newsApi: NewsapiserviceService,
    private router: Router) {}

  ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res: any) => {
      if (res.articles.length) {
        this.firstArticle = res.articles[0];
      }
    },
    (error) => {
      console.error("Error fetching news articles:", error);
    });
  }

  readMore(url: string): void {
    window.open(url, "_blank");
  }

  handleImageError(event: any, fallbackUrl: string) {
    event.target.src = fallbackUrl;
  }

  navigateToNews(){
    this.router.navigate(['/news'])
  }
}
