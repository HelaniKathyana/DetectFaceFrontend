import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) { }

  generateImage(body: any): Observable<any> {
    return this.httpClient.post(`http://localhost:8000/generate`, body)
  }

  editImage(body: any): Observable<any> {
    return this.httpClient.post(`http://localhost:8000/edit`, body)
  }

  downloadImage(url: any): Observable<any> {
    // @ts-ignore
    console.log(url)
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
