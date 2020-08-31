import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { NoOrderedDrinks } from '../../components';
import { OrderedDrinkList } from '../../components/OrderedDrinkList';
import { useSessionState } from '../../context/session';

export const SessionPage: React.FC = () => {
    const state = useSessionState();

    const haveDrinksBeenOrdered = () => !!state.currentSession && state.currentSession.orders.length > 0;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Current Session</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {haveDrinksBeenOrdered() ? (
                    <OrderedDrinkList orders={state.currentSession?.orders ?? []} />
                ) : (
                    <NoOrderedDrinks />
                )}
            </IonContent>
        </IonPage>
    );
};
