import { get, set } from 'idb-keyval';
import { Session } from '../model';
import { now } from '../util/date-util';

const KEY = 'currentSession';

export const getOrCreateCurrentSession = async (): Promise<Session> => {
    const session = await get<Session>(KEY);

    return (
        session ??
        ({
            timestamp: now(),
            orders: [],
        } as Session)
    );
};

export const updateSession = (session: Session) => {
    set(KEY, session);
};
