import {
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonRippleEffect,
    IonRow,
} from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useMemo, useRef } from 'react';
import { Discount, Drink } from '../model';
import { BarMenuItemDiscounts } from './BarMenuItemDiscounts';

interface BarMenuDrinkItemProps {
    drink: Drink;
    activeDiscounts: Discount[];
    addDrink: (drink: Drink) => void;
}

const findDiscountsForDrink = (drink: Drink, discounts: Discount[]) =>
    discounts.filter((discount) => discount.validDrinks.some((validDrink) => validDrink.name === drink.name));

export const BarMenuDrinkItem: React.FC<BarMenuDrinkItemProps> = ({ drink, activeDiscounts, addDrink: add }) => {
    const discounts = useMemo(() => findDiscountsForDrink(drink, activeDiscounts), [drink, activeDiscounts]);
    const slidingItem = useRef<HTMLIonItemSlidingElement>(null);

    const addDrink = () => {
        add(drink);
        slidingItem.current?.close();
    };

    return (
        <IonItemSliding ref={slidingItem}>
            <IonItemOptions slot="start" onIonSwipe={addDrink}>
                <IonItemOption color="success" onClick={addDrink}>
                    <IonIcon slot="icon-only" icon={addIcon}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
            <IonItem className="ion-activatable" onClick={addDrink}>
                <IonGrid className="p-5">
                    <IonRow className="ion-justify-content-start">
                        <IonCol>
                            <IonLabel>{drink.name}</IonLabel>
                        </IonCol>
                        <IonCol className="ion-text-end">
                            <IonLabel>€ {drink.price.toFixed(2)}</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow hidden={discounts.length === 0}>
                        <IonCol>
                            <BarMenuItemDiscounts discounts={discounts} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonRippleEffect></IonRippleEffect>
            </IonItem>
        </IonItemSliding>
    );
};
