import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { OrderedDrinkList } from '../../components/OrderedDrinkList';
import { useSessionState } from '../../context/session';

export const SessionPage: React.FC = () => {
    const state = useSessionState();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Current Session</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <OrderedDrinkList orders={state.currentSession.orders ?? []} />
            </IonContent>
        </IonPage>
    );
};
