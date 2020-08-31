import { IonList, IonListHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Bar, Discount } from '../model';
import { findActiveDiscounts, remainingSecondsInMinute } from '../util';
import { BarMenuDrinkItem } from './BarMenuDrinkItem';

interface BarMenuProps {
    bar: Bar;
}

const INTERVAL_DURATION = 60;

export const BarMenu: React.FC<BarMenuProps> = ({ bar }) => {
    const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>(findActiveDiscounts(bar.offeredDiscounts));

    useEffect(() => {
        const timeout = setTimeout(
            () => setInterval(() => setActiveDiscounts(findActiveDiscounts(bar.offeredDiscounts)), INTERVAL_DURATION),
            remainingSecondsInMinute() * 1000
        );

        return () => clearTimeout(timeout);
    }, [bar]);

    return (
        <IonList>
            <IonListHeader>Offered Drinks</IonListHeader>
            {bar.offeredDrinks.map((drink) => (
                <BarMenuDrinkItem key={drink.name} drink={drink} activeDiscounts={activeDiscounts} />
            ))}
        </IonList>
    );
};
