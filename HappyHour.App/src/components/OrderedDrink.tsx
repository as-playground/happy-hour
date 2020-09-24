import {
    createAnimation,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonRow,
} from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useToast } from '../context/toast';
import { Order } from '../model';
import { calculatePriceToPay } from '../model/order';
import { useCurrentSession } from '../recoil';
import { local } from '../util/date-util';
import { DiscountList } from './DiscountList';

interface OrderedDrinkProps {
    order: Order;
}

export const OrderedDrink: React.FC<OrderedDrinkProps> = ({ order }) => {
    const slidingItem = useRef<HTMLIonItemSlidingElement>(null);
    const { removeOrder: removeOrderFromSession } = useCurrentSession();
    const { showToast } = useToast();
    const priceToPay = calculatePriceToPay(order);

    const closeSlidingItem = () => slidingItem.current?.close();

    const leaveAnimation = createAnimation()
        .addElement(slidingItem.current!)
        .delay(100)
        .duration(300)
        .fromTo('opacity', '100%', '0%');

    const removeOrder = async () => {
        await closeSlidingItem();
        await leaveAnimation.play();
        removeOrderFromSession(order);
        showToast({
            message: `Removed ${order.drink.name} from session.`,
            duration: 300,
            position: 'top',
        });
    };

    return (
        <IonItemSliding ref={slidingItem}>
            <IonItemOptions side="end" onIonSwipe={removeOrder}>
                <IonItemOption color="danger" onClick={removeOrder}>
                    <IonIcon slot="icon-only" icon={trashBinOutline}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
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
        </IonItemSliding>
    );
};
