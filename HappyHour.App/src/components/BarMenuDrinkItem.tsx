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
import React, { useRef } from 'react';
import { useToast } from '../context/toast';
import { Discount, Drink } from '../model';
import { calculatePriceToPay, findValidDiscounts } from '../model/discount';
import { DiscountList } from './DiscountList';

interface BarMenuDrinkItemProps {
    drink: Drink;
    activeDiscounts: Discount[];
    onClick: (drink: Drink) => void;
}

export const BarMenuDrinkItem: React.FC<BarMenuDrinkItemProps> = ({ drink, activeDiscounts, onClick: add }) => {
    const slidingItem = useRef<HTMLIonItemSlidingElement>(null);
    const { showToast } = useToast();

    const validDiscounts = findValidDiscounts(drink, activeDiscounts);
    const priceToPay = calculatePriceToPay(drink, validDiscounts);

    const closeSlidingItem = () => slidingItem.current?.close();

    const addDrink = async () => {
        add(drink);
        await closeSlidingItem();
        showToast({
            message: `Added '${drink.name}' to the session!`,
            duration: 300,
            position: 'top',
        });
    };

    return (
        <IonItemSliding ref={slidingItem}>
            <IonItemOptions side="start" onIonSwipe={addDrink}>
                <IonItemOption color="success" onClick={addDrink}>
                    <IonIcon slot="icon-only" icon={addIcon}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
            <IonItem className="ion-activatable" onClick={addDrink}>
                <IonGrid className="px-2 py-3">
                    <IonRow className="ion-justify-content-start">
                        <IonCol className="px-0" size="8">
                            <IonLabel className="font-bold ion-text-uppercase ion-text-wrap" color="warning">
                                {drink.name}
                            </IonLabel>
                        </IonCol>
                        <IonCol className="flex justify-end items-center">
                            <IonLabel className="ion-text-wrap">€ {priceToPay.toFixed(2)}</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <DiscountList discounts={validDiscounts} />
                    </IonRow>
                </IonGrid>
                <IonRippleEffect></IonRippleEffect>
            </IonItem>
        </IonItemSliding>
    );
};
