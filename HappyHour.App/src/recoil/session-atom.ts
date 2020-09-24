import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useToast } from '../context/toast';
import {
    closeSession as closeSessionInDb,
    createSession as createSessionInDb,
    getOrCreateCurrentSession as getOrCreateCurrentSessionInDb,
    updateSession as updateSessionInDb,
} from '../data/happyhour-db';
import { Discount, Drink, Order } from '../model';
import { now } from '../util/date-util';

export const sessionAtom = atom({
    key: 'sessionAtomFamily',
    default: getOrCreateCurrentSessionInDb(),
});

export const useCurrentSession = () => {
    const [session, setSession] = useRecoilState(sessionAtom);

    const { showToast } = useToast();

    useEffect(() => {
        if (session) {
            updateSessionInDb(session);
        }
    }, [session]);

    const addDrink = (drink: Drink, discounts: Discount[]) => {
        try {
            const order: Order = {
                id: session.orders.length + 1,
                timestamp: now(),
                drink,
                discounts,
            };

            setSession((currentValue) => ({
                ...currentValue,
                orders: [...session.orders, order],
            }));
        } catch (ex) {
            showToast({
                message: ex,
                duration: 500,
            });
        }
    };

    const removeOrder = (order: Order) =>
        setSession((currentValue) => ({
            ...currentValue,
            orders: session.orders.filter((o) => o !== order),
        }));

    const closeSession = async () => {
        await closeSessionInDb(session);

        const newSession = await createSessionInDb();

        setSession(newSession);
    };

    return { session, addDrink, removeOrder, closeSession };
};
