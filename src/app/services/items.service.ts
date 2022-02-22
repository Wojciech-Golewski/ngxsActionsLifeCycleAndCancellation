import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private allItems: Item[] = [];
  private idNumber = 1;

  constructor() { }

  addItem(item: Item): Observable<Item> {
    item.id = this.idNumber;
    this.allItems = Object.assign([], this.allItems);
    this.allItems.push(item);
    this.idNumber++;
    return of(item).pipe(delay(1000));
  }

  removeItem(itemId: number): Observable<void> {
    this.allItems = this.allItems.filter((item: Item) => item.id !== itemId);
    return of(undefined);
  }

  getAllItems(): Observable<Item[]> {
    return of(this.allItems).pipe(delay(3000));
  }
}
