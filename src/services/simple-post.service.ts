import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimplePostService {

  constructor(private http: HttpClient) { }

  send() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe(data => {
        console.log(data)
        alert('hi')
      });

  }
}
