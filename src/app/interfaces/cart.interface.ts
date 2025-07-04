import { Address } from "../models/address.model";
import { Item } from "../models/item.model";
import { Shop } from "../models/shop.model";

export interface Cart {
    shop:Shop;
    items: Item[];
    totalItem?: number;
    totalPrice?: number;
    grandTotal?: number;
    location?: Address;
    deliveryCharge?: number;
    from?: string;
}