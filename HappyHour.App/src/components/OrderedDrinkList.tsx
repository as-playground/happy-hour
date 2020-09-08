import { IonList, IonListHeader } from '@ionic/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { sessionAtom } from '../recoil/session-atom';
import { NoOrderedDrinks } from './NoOrderedDrinks';
import { OrderedDrink } from './OrderedDrink';

export const OrderedDrinkList: React.FC = () => {
    const { orders } = useRecoilValue(sessionAtom);

    if (orders.length === 0) {
        return <NoOrderedDrinks />;
    }

    return (
        <IonList className="h-full">
            <IonListHeader>Ordered Drinks</IonListHeader>
            {orders.map((order) => (
                <OrderedDrink key={order.id} order={order} />
            ))}
        </IonList>
    );
};
