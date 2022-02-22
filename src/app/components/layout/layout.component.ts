import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { AddItem, RemoveItem } from 'src/app/state/items.actions';
import { ItemsState } from 'src/app/state/items.state';
import { Actions, ofActionCompleted, ActionCompletion } from '@ngxs/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(ItemsState.getAllItems) allItems$: Observable<Item[]> | undefined;
  loadingItems: boolean[] = [];
  item = '';

  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private store: Store, private actions$: Actions) { }

  ngOnInit(): void {
    this.actions$
      .pipe(ofActionCompleted(AddItem, RemoveItem))
      .subscribe((data: ActionCompletion) => {
        if (data.result.successful) {
          if (data.action instanceof RemoveItem) {
            this._snackBar.open(`Item was removed!`, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else if (data.action instanceof AddItem) {
            this._snackBar.open(`Item ${data.action.payload.name} was added!`, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        } else if (data.result.error) {
          this._snackBar.open(`There was an error, please try again`, 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.loadingItems.pop();
      });
  }

  addItem(itemName: string): void {
    this.loadingItems.push(true);

    this.store.dispatch(new AddItem(new Item(itemName)));
  }

  removeItem(id: number): void {
    this.store.dispatch(new RemoveItem(id));
  }
}

