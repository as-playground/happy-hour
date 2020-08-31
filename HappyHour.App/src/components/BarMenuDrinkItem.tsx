import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React, { useMemo } from 'react';
import { Discount, Drink } from '../model';
import { BarMenuItemDiscounts } from './BarMenuItemDiscounts';

interface BarMenuDrinkItemProps {
    drink: Drink;
    activeDiscounts: Discount[];
}

const findDiscountsForDrink = (drink: Drink, discounts: Discount[]) =>
    discounts.filter((discount) => discount.validDrinks.some((validDrink) => validDrink.name === drink.name));

export const BarMenuDrinkItem: React.FC<BarMenuDrinkItemProps> = ({ drink, activeDiscounts }) => {
    const discounts = useMemo(() => findDiscountsForDrink(drink, activeDiscounts), [drink, activeDiscounts]);

    return (
        <IonItem>
            <IonGrid className="py-5">
                <IonRow className="ion-justify-content-start">
                    <IonCol>
                        <IonLabel>{drink.name}</IonLabel>
                    </IonCol>
                    <IonCol className="ion-text-end">
                        <IonLabel>€ {drink.price.toFixed(2)}</IonLabel>
                    </IonCol>
                </IonRow>
                {discounts.length > 0 && (
                    <IonRow>
                        <IonCol>
                            <BarMenuItemDiscounts discounts={discounts} />
                        </IonCol>
                    </IonRow>
                )}
            </IonGrid>
        </IonItem>
    );
};
