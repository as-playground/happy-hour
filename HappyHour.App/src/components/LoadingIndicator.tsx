import { IonLoading } from '@ionic/react';
import React from 'react';
import './LoadingIndicator.css';

export const LoadingIndicator: React.FC = () => {
    return <IonLoading cssClass="loading-indicator" isOpen={true} message="Loading ..."></IonLoading>;
};
