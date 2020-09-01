import { IonList, IonListHeader, IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSessionDispatch } from '../context/session';
import { Bar, Discount, Drink } from '../model';
import { findActiveDiscounts, remainingSecondsInMinute } from '../util';
import { BarMenuDrinkItem } from './BarMenuDrinkItem';

interface BarMenuProps {
    bar: Bar;
}

const INTERVAL_DURATION = 60;

export const BarMenu: React.FC<BarMenuProps> = ({ bar }) => {
    const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>(findActiveDiscounts(bar.offeredDiscounts));
    const [toastMessage, setToastMessage] = useState<string>('');
    const [isToastVisible, setToastVisible] = useState(false);

    const dispatch = useSessionDispatch();

    useEffect(() => {
        const timeout = setTimeout(
            () => setInterval(() => setActiveDiscounts(findActiveDiscounts(bar.offeredDiscounts)), INTERVAL_DURATION),
            remainingSecondsInMinute() * 1000
        );

        return () => clearTimeout(timeout);
    }, [bar]);

    const addDrink = (drink: Drink) => {
        dispatch({ type: 'addDrinkAction', drink, discounts: activeDiscounts });
        showToast(`Added '${drink.name}' to the session!`);
    };

    const showToast = (message: string) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    return (
        <>
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
            <IonToast
                isOpen={isToastVisible}
                onDidDismiss={() => setToastVisible(false)}
                message={toastMessage}
                duration={500}
            />
        </>
    );
};
