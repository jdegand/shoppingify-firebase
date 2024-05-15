import { Item } from "./item.interface";

export interface List {
    name: string;
    items: Item [];
    date: Date;
}