import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsapiserviceService {

  constructor(private http: HttpClient) { }

  initArticles() {
    return this.http.get('https://ok.surf/api/v1/cors/news-feed' )
      .pipe(
        map((response: any) => {
          // Assuming response.articles is the array of articles
          const filteredArticles = response.articles.filter(article => {
            // Check if the article's image URL does not contain 'youtube'
            return !article.urlToImage || !article.urlToImage.includes('youtube');
          });
          return { ...response, articles: filteredArticles };
        })
      );
  }

  // getArticlesByID(category: String) {
  //   return this.http.get('https://ok.surf/api/v1/cors/news-feed');
  // }
}
