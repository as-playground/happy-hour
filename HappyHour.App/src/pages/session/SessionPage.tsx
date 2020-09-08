import {
    IonAlert,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { walletOutline } from 'ionicons/icons';
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
                    <IonButtons slot="end">
                        <IonButton onClick={() => setAlertOpen(true)} disabled={session.orders.length === 0}>
                            <IonIcon slot="icon-only" icon={walletOutline} color="warning" />
                        </IonButton>
                    </IonButtons>
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
                <IonToolbar className="px-6 font-bold">
                    <IonLabel slot="start" className="text-lg">
                        Total:
                    </IonLabel>
                    <IonLabel slot="end" className="text-lg" color="warning">
                        € {calculateSum(session.orders).toFixed(2)}
                    </IonLabel>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default SessionPage;
