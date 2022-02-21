import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { MemeArchiveService } from "../services/meme-archive.service";
import { FetchRandomMeme } from "./meme.actions";

export interface MemeStateModel {
  chosenMeme: string;
}

@State({
  name: 'meme',
  defaults: {
    chosenMeme: false
  }
})
@Injectable()
export class MemeState {
  constructor(private memeArchiveService: MemeArchiveService) {}

  @Action(FetchRandomMeme)
  fetchRandomMeme(ctx: StateContext<MemeStateModel>) {
    return this.memeArchiveService.randomMeme().pipe(
      tap((meme: string) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          chosenMeme: meme
        });
        console.log('New random image chosen in state');
      })
    );
  }

  @Selector()
  static getCurrentMeme(state: MemeStateModel): string {
    return state.chosenMeme;
  }
}