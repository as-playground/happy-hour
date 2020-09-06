import { IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import { Order } from '../model';
import { local } from '../util/date-util';

interface OrderedDrinkProps {
    order: Order;
}

export const OrderedDrink: React.FC<OrderedDrinkProps> = ({ order }) => {
    return (
        <IonItem>
            <IonGrid>
                <IonRow>
                    <IonLabel>{order.drink.name}</IonLabel>
                </IonRow>
                <IonRow>
                    <IonLabel>{local(order.timestamp).format('L LT')}</IonLabel>
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};
