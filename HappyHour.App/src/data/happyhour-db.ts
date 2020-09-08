import { DBSchema, openDB as openIDB } from 'idb';
import { Session } from '../model';
import { now } from '../util/date-util';

const DB_KEY = 'HappyHourDB';
const DB_VERSION = 1;

interface HappyHourDB extends DBSchema {
    session: {
        key: number;
        value: Session;
    };
}

const openDB = async () => {
    return await openIDB<HappyHourDB>(DB_KEY, DB_VERSION, {
        upgrade: (db) => {
            db.createObjectStore('session', {
                autoIncrement: true,
            });
        },
    });
};

export const getOrCreateCurrentSession = async (): Promise<Session> => {
    const allSessions = await getAllSessions();
    const openSessions = allSessions.filter((s) => !s.closed);

    if (openSessions.length === 0) {
        return createSession();
    }

    const remainingOpenSession = await closeStaleSessions(openSessions);

    return remainingOpenSession;
};

const getAllSessions = async () => {
    const db = await openDB();
    const store = db.transaction('session').objectStore('session');

    return await store.getAll();
};

const createSession = async (session?: Session): Promise<Session> => {
    const db = await openDB();
    const store = db.transaction('session', 'readwrite').objectStore('session');

    const id = await store.add(
        session ?? {
            timestamp: now(),
            orders: [],
            closed: false,
        }
    );

    const newSession = await store.get(id);

    return newSession!!;
};

export const updateSession = async (session: Session): Promise<void> => {
    const db = await openDB();
    const store = db.transaction('session', 'readwrite').objectStore('session');

    if (session.id) {
        await store.put(session);
    }
};

export const closeSession = async (session: Session): Promise<void> => {
    await updateSession({ ...session, closed: true });
};

export const closeSessions = async (sessions: Session[]): Promise<void> => {
    await Promise.all(sessions.map((session) => closeSession(session)));
};

const closeStaleSessions = async (openSessions: Session[]): Promise<Session> => {
    openSessions.sort((a, b) => +(a.timestamp > b.timestamp) - +(a.timestamp < b.timestamp));
    const staleSessions = openSessions.slice(1);

    await closeSessions(staleSessions);

    return openSessions[0];
};
