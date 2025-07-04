import { Address } from "./address.model";
import { Item } from "./item.model";
import { Shop } from "./shop.model";

export class Order {
    constructor(
        public address: Address,
        public shop: Shop,
        public shop_id: string,
        public order: Item[],
        public total: number,
        public grandTotal: number,
        public deliveryCharge: number,
        public status: string,
        public time: string,
        public paid: string,
        public id?: string,
        public uid?: string,
        public instruction?: string,
    ) {}
}