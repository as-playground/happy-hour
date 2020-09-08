import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
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

    useEffect(() => {
        updateSessionInDb(session);
    }, [session]);

    const addDrink = (drink: Drink, discounts: Discount[]) => {
        const order: Order = {
            id: session.orders.length + 1,
            timestamp: now(),
            drink,
            discounts,
        };

        setSession({
            ...session,
            orders: [...session.orders, order],
        });
    };

    const closeSession = async () => {
        await closeSessionInDb(session);

        const newSession = await createSessionInDb();

        setSession(newSession);
    };

    return { session, addDrink, closeSession };
};
