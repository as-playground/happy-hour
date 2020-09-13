import { IonList, IonListHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Bar, Discount, Drink } from '../model';
import { findActiveDiscounts, findValidDiscounts } from '../model/discount';
import { useCurrentSession } from '../recoil/session-atom';
import { remainingSecondsInCurrentMinute } from '../util/date-util';
import { BarMenuDrinkItem } from './BarMenuDrinkItem';

interface BarMenuProps {
    bar: Bar;
}

const INTERVAL_DURATION = 60;

export const BarMenu: React.FC<BarMenuProps> = ({ bar }) => {
    const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>(findActiveDiscounts(bar.offeredDiscounts));
    const { addDrink: addDrinkToSession } = useCurrentSession();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const timeout = setTimeout(() => {
            interval = setInterval(
                () => setActiveDiscounts(findActiveDiscounts(bar.offeredDiscounts)),
                INTERVAL_DURATION * 1000
            );
        }, remainingSecondsInCurrentMinute() * 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [bar]);

    const addDrink = (drink: Drink) => addDrinkToSession(drink, findValidDiscounts(drink, activeDiscounts));

    return (
        <IonList>
            <IonListHeader>Offered Drinks</IonListHeader>
            {bar.offeredDrinks.map((drink) => (
                <BarMenuDrinkItem key={drink.name} drink={drink} activeDiscounts={activeDiscounts} onClick={addDrink} />
            ))}
        </IonList>
    );
};
