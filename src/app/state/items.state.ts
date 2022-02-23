import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { delay, of, tap } from "rxjs";
import { Item } from "../models/item";
import { ItemsService } from "../services/items.service";
import { AddItem, RemoveItem } from "./items.actions";

export interface ItemsStateModel {
  items: Item[];
}

@State({
  name: 'items',
  defaults: {
    items: []
  }
})
@Injectable()
export class ItemsState {
  constructor(private itemsService: ItemsService) {}

  @Action(AddItem)
  addItem(ctx: StateContext<ItemsStateModel>, action: AddItem) {
    // below is error for testing
    // throw new Error('');
    
    return this.itemsService.addItem(action.payload).pipe(
      tap((addedItem: Item) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: state.items.concat(addedItem)
        });
      })
    );
  }
  
  @Action(RemoveItem)
  removeItem(ctx: StateContext<ItemsStateModel>, action: RemoveItem) {
    // below is error for testing
    // throw new Error('');

    return this.itemsService.removeItem(action.payload).pipe(
      tap((itemId: number) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: state.items.filter((item: Item) => item.id !== itemId)
        });
      })
    );
  }

  @Selector()
  static getAllItems(state: ItemsStateModel): Item[] {
    return state.items;
  }
}