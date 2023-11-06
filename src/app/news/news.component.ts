import { Component, OnInit } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import { NewsapiserviceService } from '../services/newsapiservice.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent  implements OnInit{

constructor(private newsApi : NewsapiserviceService){}

public sources:any = [];
public articles: any=[];

ngOnInit(): void {
  this.newsApi.initArticles()
  .subscribe((res:any)=>{
    console.log("response", res);
    this.articles = res.articles;

  })
}

handleImageError(event: any, fallbackUrl: string) {
  event.target.src = fallbackUrl;
}


}
