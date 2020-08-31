import { IonList, IonListHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Bar, Discount } from '../model';
import { isDiscountActive } from '../util';
import { BarMenuDrinkItem } from './BarMenuDrinkItem';

interface BarMenuProps {
    bar: Bar;
}

const findActiveDiscounts = (discounts: Discount[]) =>
    discounts.filter((discount) => isDiscountActive(discount, new Date()));

export const BarMenu: React.FC<BarMenuProps> = ({ bar }) => {
    const INTERVAL_DURATION = 60 * 1000;

    const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>(findActiveDiscounts(bar.offeredDiscounts));

    useEffect(() => {
        const interval = setInterval(
            () => setActiveDiscounts(findActiveDiscounts(bar.offeredDiscounts)),
            INTERVAL_DURATION
        );

        return () => clearInterval(interval);
    });

    return (
        <IonList>
            <IonListHeader>Offered Drinks</IonListHeader>
            {bar.offeredDrinks.map((drink) => (
                <BarMenuDrinkItem key={drink.name} drink={drink} activeDiscounts={activeDiscounts} />
            ))}
        </IonList>
    );
};
