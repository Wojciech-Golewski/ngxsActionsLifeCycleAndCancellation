import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private allMemes = [
    '../../../assets/images/wow-how-that-happened-surprised-kirk.JPG',
    '../../../assets/images/i-like-it-thor-meme.JPG'
  ]

  constructor() { }

  randomMeme(): Observable<string> {
    const randomNumberFromAllMemesLength = Math.floor(Math.random() * this.allMemes.length);
    return of(this.allMemes[randomNumberFromAllMemesLength]).pipe(delay(2000));
  }
}
