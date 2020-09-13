import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import { Order } from '../model';
import { calculatePriceToPay } from '../model/order';
import { local } from '../util/date-util';
import { DiscountList } from './DiscountList';

interface OrderedDrinkProps {
    order: Order;
}

export const OrderedDrink: React.FC<OrderedDrinkProps> = ({ order }) => {
    const priceToPay = calculatePriceToPay(order);

    return (
        <IonItem>
            <IonGrid>
                <IonRow>
                    <IonCol className="pl-0 ion-justify-content-center" size="8">
                        <IonLabel className="font-bold ion-text-uppercase ion-text-wrap" color="warning">
                            {order.drink.name}
                        </IonLabel>
                        <IonLabel className="ion-text-wrap">{local(order.timestamp).format('L LT')}</IonLabel>
                    </IonCol>
                    <IonCol className="flex ion-justify-content-end ion-align-items-start">
                        <IonLabel className="ion-text-wrap">€ {priceToPay.toFixed(2)}</IonLabel>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <DiscountList discounts={order.discounts} />
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};
