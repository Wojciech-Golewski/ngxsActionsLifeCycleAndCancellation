import { Item } from "../models/item";

export class AddItem {
    static readonly type = '[Items] Add Item';
    constructor(public payload: Item) {}
}

export class RemoveItem {
    static readonly type = '[Items] Remove Item';
    constructor(public payload: number) {}
}