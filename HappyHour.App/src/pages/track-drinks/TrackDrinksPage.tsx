import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { BarMenu } from '../../components';
import bars from '../../data';

export const TrackDrinksPage: React.FC = () => {
    const defaultBar = bars[0];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{defaultBar.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <BarMenu bar={defaultBar} />
            </IonContent>
        </IonPage>
    );
};
