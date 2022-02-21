import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchRandomMeme } from 'src/app/state/meme.actions';
import { MemeState } from 'src/app/state/meme.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(MemeState.getCurrentMeme) currentMeme$: Observable<string> | undefined;
  loaded = false;
  displayMemeContainer = false;

  constructor(private store: Store) { }

  ngOnInit(): void {}

  fetchRandomMeme(): void {
    this.loaded = false;
    this.store.dispatch(new FetchRandomMeme()).subscribe(() => {
      this.loaded = true;
    })
    this.displayMemeContainer = true;
  }
}

