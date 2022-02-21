import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ImagesService } from "../services/images.service";
import { FetchRandomImage } from "./image.actions";

export interface ImageStateModel {
  chosenImage: string;
}

@State({
  name: 'meme',
  defaults: {
    chosenImage: false
  }
})
@Injectable()
export class ImageState {
  constructor(private imagesService: ImagesService) {}

  @Action(FetchRandomImage)
  fetchRandomImage(ctx: StateContext<ImageStateModel>) {
    return this.imagesService.randomMeme().pipe(
      tap((image: string) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          chosenImage: image
        });
        console.log('New random image chosen in state');
      })
    );
  }

  @Selector()
  static getCurrentImage(state: ImageStateModel): string {
    return state.chosenImage;
  }
}