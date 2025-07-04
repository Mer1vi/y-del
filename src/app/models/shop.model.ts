export class Shop {
    
    constructor(
        public uid: string,
        public cover: string,
        public name: string,
        public short_name: string,
        public cuisines: string[],
        public rating: number,
        public delivery_time: number,
        public price: number,
        public phone: number,
        public email: string,
        public isClose: boolean,
        public description: string,
        public openTime: string,
        public closeTime: string,
        public city: string,
        public address: string,
        public status: string,
        public totalRating: number,
        public coordinates: any,
        public g?: any,
        public distance?: number,
    ) {}

}