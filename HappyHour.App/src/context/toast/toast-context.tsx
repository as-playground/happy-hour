import { IonToast, ToastOptions } from '@ionic/react';
import React, { useEffect, useState } from 'react';

interface ToastState {
    showToast: (options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastState | undefined>(undefined);

export const useToast = () => {
    const context = React.useContext(ToastContext);

    if (!context) {
        throw new Error('No ToastProvider available!');
    }

    return context;
};

export const ToastProvider: React.FC = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [options, setOptions] = useState<ToastOptions>();
    const [queue, setQueue] = useState<ToastOptions[]>([]);

    useEffect(() => {
        if (queue.length > 0) {
            setOptions(queue[0]);
        }
    }, [queue]);

    useEffect(() => {
        if (options) {
            setOpen(true);
        }
    }, [options]);

    const showToast = (options: ToastOptions) => {
        setQueue([...queue, options]);
    };

    const onToastDismissed = () => {
        setOpen(false);
        setQueue(queue.slice(1));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <IonToast {...options} isOpen={isOpen} onDidDismiss={onToastDismissed}></IonToast>
        </ToastContext.Provider>
    );
};
