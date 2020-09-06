import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import { Discount, Drink, Order } from '../model';
import { findActiveDiscounts } from '../util';
import { local } from '../util/date-util';
import { DiscountList } from './DiscountList';

interface OrderedDrinkProps {
    order: Order;
}

const findValidDiscounts = (order: Order) =>
    findActiveDiscounts(order.discounts, order.timestamp).filter((discount) =>
        discount.validDrinks.includes(order.drink)
    );

const calculatePriceToPay = (drink: Drink, validDiscounts: Discount[]) =>
    validDiscounts.reduce((totalSum, discount) => totalSum * (1 - discount.amount), drink.price);

export const OrderedDrink: React.FC<OrderedDrinkProps> = ({ order }) => {
    const validDiscounts = findValidDiscounts(order);
    const priceToPay = calculatePriceToPay(order.drink, validDiscounts);

    return (
        <IonItem>
            <IonGrid>
                <IonRow>
                    <IonCol className="ion-justify-content-center" size="8">
                        <IonLabel className="font-bold ion-text-uppercase ion-text-wrap">{order.drink.name}</IonLabel>
                        <IonLabel className="ion-text-wrap">{local(order.timestamp).format('L LT')}</IonLabel>
                    </IonCol>
                    <IonCol className="flex ion-justify-content-end ion-align-items-center">
                        <IonLabel className="ion-text-wrap">€ {priceToPay.toFixed(2)}</IonLabel>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <DiscountList discounts={validDiscounts} />
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};
