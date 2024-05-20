import { Item } from "./item.interface";

export interface List {
    id?: string;
    name: string;
    items: Item [];
    date?: {
        seconds: number;
        nanoseconds: number;
    };
}