interface DiscountTime {
    from: Date;
    to: Date;
}

export interface DiscountTimeDictionary {
    [key: number]: DiscountTime;
}
