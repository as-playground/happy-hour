import { DBSchema, IDBPDatabase, openDB as openIDB } from 'idb';
import { Session } from '../model';
import { now } from '../util/date-util';

const DB_KEY = 'HappyHourDB';
const DB_VERSION = 1;

interface SessionTable {
    key: 'session';
    value: Session;
}

interface HappyHourDB extends DBSchema {
    session: SessionTable;
}

const openDBMemoized = () => {
    const cache: { db?: IDBPDatabase<HappyHourDB> } = {};

    return async () => {
        if (cache.db) {
            return cache.db;
        }

        cache.db = await openIDB<HappyHourDB>(DB_KEY, DB_VERSION, {
            upgrade: (db) => {
                db.createObjectStore('session', {
                    autoIncrement: true,
                    keyPath: 'id',
                });
            },
        });

        return cache.db;
    };
};

const openDB = openDBMemoized();

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

    return await db.getAll('session');
};

export const createSession = async (session?: Session): Promise<Session> => {
    const db = await openDB();

    const id = await db.add(
        'session',
        session ?? {
            timestamp: now(),
            orders: [],
            closed: false,
        }
    );

    const newSession = await db.get('session', id);

    return newSession!!;
};

export const updateSession = async (session: Session): Promise<void> => {
    if (session.id) {
        const db = await openDB();
        await db.put('session', session);
    }
};

export const closeSession = (session: Session): Promise<void> => updateSession({ ...session, closed: true });

export const closeSessions = async (sessions: Session[]): Promise<void> => {
    await Promise.all(sessions.map((session) => closeSession(session)));
};

const closeStaleSessions = async (openSessions: Session[]): Promise<Session> => {
    openSessions.sort((a, b) => +(a.timestamp < b.timestamp) - +(a.timestamp > b.timestamp));
    const staleSessions = openSessions.slice(1);

    await closeSessions(staleSessions);

    return openSessions[0];
};
