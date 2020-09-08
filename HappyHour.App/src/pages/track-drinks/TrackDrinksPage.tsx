import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { Suspense, useState } from 'react';
import { BarMenu } from '../../components';
import bars from '../../data';
import { Bar } from '../../model';

export const TrackDrinksPage: React.FC = () => {
    const [currentBar] = useState<Bar>(bars[0]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{currentBar.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Suspense fallback={<IonSpinner />}>
                    <BarMenu bar={currentBar} />
                </Suspense>
            </IonContent>
        </IonPage>
    );
};
