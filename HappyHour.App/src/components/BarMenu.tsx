import { IonList, IonListHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSessionDispatch } from '../context/session';
import { ToastProvider } from '../context/toast';
import { Bar, Discount, Drink } from '../model';
import { findActiveDiscounts, remainingSecondsInMinutes as remainingSecondsInMinute } from '../util';
import { BarMenuDrinkItem } from './BarMenuDrinkItem';

interface BarMenuProps {
    bar: Bar;
}

const INTERVAL_DURATION = 60;

export const BarMenu: React.FC<BarMenuProps> = ({ bar }) => {
    const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>(findActiveDiscounts(bar.offeredDiscounts));

    const dispatch = useSessionDispatch();

    useEffect(() => {
        const timeout = setTimeout(
            () =>
                setInterval(
                    () => setActiveDiscounts(findActiveDiscounts(bar.offeredDiscounts)),
                    INTERVAL_DURATION * 1000
                ),
            remainingSecondsInMinute() * 1000
        );

        return () => clearTimeout(timeout);
    }, [bar]);

    const addDrink = (drink: Drink) => {
        dispatch({ type: 'addDrinkAction', drink, discounts: activeDiscounts });
    };

    return (
        <ToastProvider>
            <IonList color="primary">
                <IonListHeader>Offered Drinks</IonListHeader>
                {bar.offeredDrinks.map((drink) => (
                    <BarMenuDrinkItem
                        key={drink.name}
                        drink={drink}
                        activeDiscounts={activeDiscounts}
                        addDrink={addDrink}
                    />
                ))}
            </IonList>
        </ToastProvider>
    );
};
