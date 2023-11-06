import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsapiserviceService {

  api_key = 'ca082fbb23574cb7b9c7454621a57704';
  constructor(private http: HttpClient) { }

  initArticles() {
    return this.http.get('https://newsapi.org/v2/everything?q=basketball&apiKey=' + this.api_key)
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

  getArticlesByID(source: String) {
    return this.http.get('https://newsapi.org/v2/top-headlines/sources?' + source + '&apiKey=' + this.api_key);
  }
}
