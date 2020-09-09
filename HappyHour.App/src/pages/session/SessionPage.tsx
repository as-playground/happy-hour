import {
    IonAlert,
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { OrderedDrinkList } from '../../components/OrderedDrinkList';
import { useCurrentSession } from '../../recoil';
import { calculateSum } from '../../util/order-util';
import './SessionPage.css';
const SessionPage: React.FC = () => {
    const [isAlertOpen, setAlertOpen] = useState(false);
    const { session, closeSession } = useCurrentSession();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Current Session</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <OrderedDrinkList orders={session.orders} />
                <IonAlert
                    isOpen={isAlertOpen}
                    onDidDismiss={() => setAlertOpen(false)}
                    header={'Warning'}
                    message={'Are you sure you want to close your current session?'}
                    buttons={[
                        { text: 'Cancel', role: 'cancel' },
                        { text: 'Close', cssClass: 'session-alert warning-text', handler: () => closeSession() },
                    ]}
                />
            </IonContent>
            <IonFooter>
                <IonToolbar hidden={session.orders.length === 0} className="px-6 font-bold">
                    <IonButton color="warning w-full" onClick={() => setAlertOpen(true)}>
                        <IonLabel className="text-lg">Total: € {calculateSum(session.orders).toFixed(2)}</IonLabel>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default SessionPage;
