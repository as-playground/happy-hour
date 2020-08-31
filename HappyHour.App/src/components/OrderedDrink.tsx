import { IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';
import { Order } from '../model';

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
                    <IonLabel>{order.timestamp.toString()}</IonLabel>
                </IonRow>
            </IonGrid>
        </IonItem>
    );
};
