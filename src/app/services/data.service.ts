import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  latent_space: any
  constructor() { }

  setLatentSpace(latent_space): void{
    this.latent_space = latent_space;
  }

  getLatentSpace(): void{
    return this.latent_space;
  }
}
