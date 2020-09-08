import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { OrderedDrinkList } from '../../components/OrderedDrinkList';

export const SessionPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Current Session</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <OrderedDrinkList />
            </IonContent>
        </IonPage>
    );
};
