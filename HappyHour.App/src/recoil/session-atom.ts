import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { getOrCreateCurrentSession, updateSession } from '../data/indexeddb';
import { Discount, Drink, Order } from '../model';
import { now } from '../util/date-util';

export const sessionAtom = atom({
    key: 'sessionAtomFamily',
    default: getOrCreateCurrentSession(),
});

export const useCurrentSession = () => {
    const [session, setSession] = useRecoilState(sessionAtom);

    useEffect(() => {
        updateSession(session);
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

    return { session, addDrink };
};
