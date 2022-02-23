import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { AddItem, RemoveItem } from 'src/app/state/items.actions';
import { ItemsState } from 'src/app/state/items.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(ItemsState.getAllItems) allItems$: Observable<Item[]> | undefined;
  loadingItems: boolean[] = [];
  item = '';

  constructor(private store: Store) { }

  ngOnInit(): void {}

  addItem(itemName: string): void {
    this.loadingItems.push(true);

    this.store.dispatch(new AddItem(new Item(itemName))).subscribe(() =>
        this.loadingItems.pop()
    );
  }

  removeItem(id: number): void {
    this.store.dispatch(new RemoveItem(id));
  }
}

