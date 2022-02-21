import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchRandomImage } from 'src/app/state/image.actions';
import { ImageState } from 'src/app/state/image.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(ImageState.getCurrentImage) currentImage$: Observable<string> | undefined;
  loaded = false;
  displayMemeContainer = false;

  constructor(private store: Store) { }

  ngOnInit(): void {}

  fetchRandomMeme(): void {
    this.loaded = false;
    this.store.dispatch(new FetchRandomImage()).subscribe(() => {
      this.loaded = true;
    })
    this.displayMemeContainer = true;
  }
}

