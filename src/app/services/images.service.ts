import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private allImages = [
    '../../../assets/images/wow-how-that-happened-surprised-kirk.JPG',
    '../../../assets/images/i-like-it-thor.JPG',
    '../../../assets/images/wait-thats-illegal.JPG',
    '../../../assets/images/high-ground.JPG',
    '../../../assets/images/impossible-thanos.JPG',
    '../../../assets/images/this-is-where-the-fun-begins.JPG',
  ]

  constructor() { }

  randomImage(): Observable<string> {
    const randomIndexOfImagesRange = Math.floor(Math.random() * this.allImages.length);
    return of(this.allImages[randomIndexOfImagesRange]).pipe(delay(2000));
  }
}
