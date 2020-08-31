import { IonList, IonListHeader } from '@ionic/react';
import React from 'react';
import { Order } from '../model';
import { OrderedDrink } from './OrderedDrink';

interface OrderedDrinkListProps {
    orders: Order[];
}

export const OrderedDrinkList: React.FC<OrderedDrinkListProps> = ({ orders }) => {
    return (
        <IonList className="h-full">
            <IonListHeader>Ordered Drinks</IonListHeader>
            {orders.map((order) => (
                <OrderedDrink key={order.id} order={order} />
            ))}
        </IonList>
    );
};
