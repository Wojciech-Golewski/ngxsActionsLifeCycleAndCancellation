import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { delay, mergeMap, of, tap } from "rxjs";
import { Item } from "../models/item";
import { ItemsService } from "../services/items.service";
import { AddItem, FetchAllItems, RemoveItem } from "./items.actions";

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

  @Action(AddItem, { cancelUncompleted: true })
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
        console.log('New item added to the state!');
      })
    );
    // you can comment out above return and use the one below
    // return this.itemsService.addItem(action.payload).pipe(
    //   mergeMap(() => ctx.dispatch(new FetchAllItems()))
    // );
  }
  
  @Action(RemoveItem, { cancelUncompleted: true })
  removeItem(ctx: StateContext<ItemsStateModel>, action: RemoveItem) {
    // below is error for testing
    // throw new Error('');

    return this.itemsService.removeItem(action.payload).pipe(
      mergeMap(() => ctx.dispatch(new FetchAllItems()))
    )
  }

  @Action(FetchAllItems)
  fetchAllItems(ctx: StateContext<ItemsStateModel>) {
    return this.itemsService.getAllItems().pipe(
      tap((items: Item[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: items,
        });
      })
    )
  }

  @Selector()
  static getAllItems(state: ItemsStateModel): Item[] {
    return state.items;
  }
}