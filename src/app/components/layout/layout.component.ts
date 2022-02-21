import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchRandomImage } from 'src/app/state/image.actions';
import { ImageState } from 'src/app/state/image.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('extendContent', [
      state('false', style({
        height: '0',
      })),
      state('true', style({
        height: '30rem',
        paddingBottom: '3rem'
      })),
      transition('* => *', [
        animate('500ms ease-in-out')
      ]),
    ]),
  ]
})
export class LayoutComponent implements OnInit {
  @Select(ImageState.getCurrentImage) currentImage$: Observable<string> | undefined;
  loaded = false;
  displayImageContainer = false;

  constructor(private store: Store) { }

  ngOnInit(): void {}

  fetchRandomImage(): void {
    this.loaded = false;
    this.displayImageContainer = true;
    this.store.dispatch(new FetchRandomImage()).subscribe(() => {
      this.loaded = true;
    })
  }
}

