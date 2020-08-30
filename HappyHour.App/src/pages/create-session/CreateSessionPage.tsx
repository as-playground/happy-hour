import { IonButton, IonContent, IonLabel, IonPage, useIonRouter } from '@ionic/react';
import React from 'react';
import { useSessionDispatch } from '../../context/session';

export const CreateSessionPage: React.FC = () => {
    const dispatch = useSessionDispatch();
    const { push } = useIonRouter();

    const createSession = () => {
        dispatch({ type: 'createSessionAction', timestamp: new Date() });
        push('track-drinks', 'root');
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="h-full flex flex-col justify-center items-center p-4">
                    <IonLabel className="p-3">You have not yet created a session!</IonLabel>
                    <IonButton className="w-full" onClick={createSession}>
                        Start Session
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};
