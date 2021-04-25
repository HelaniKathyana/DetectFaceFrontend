import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) { }

  generateImage(): Observable<any> {
    return this.httpClient.get(`http://localhost:8000/generate`)
  }

  editImage(body:any): Observable<any> {
    return this.httpClient.post(`http://localhost:8000/edit`, body )
  }
}
