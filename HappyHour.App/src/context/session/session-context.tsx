import React from 'react';
import { now } from '../../util';
import { SessionDispatch } from './session-actions';
import { SessionReducer, SessionState } from './session-reducer';

const SessionStateContext = React.createContext<SessionState | undefined>(undefined);
const SessionDispatchContext = React.createContext<SessionDispatch | undefined>(undefined);

export const useSessionState = () => {
    const context = React.useContext(SessionStateContext);

    if (!context) {
        throw new Error('No SessionProvider available!');
    }

    return context;
};

export const useSessionDispatch = () => {
    const context = React.useContext(SessionDispatchContext);

    if (!context) {
        throw new Error('No SessionProvider available!');
    }

    return context;
};

export const useSession = () => [useSessionState(), useSessionDispatch()];

export const SessionProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(SessionReducer, {
        currentSession: { timestamp: now(), orders: [] },
    } as SessionState);

    return (
        <SessionStateContext.Provider value={state}>
            <SessionDispatchContext.Provider value={dispatch}>{children}</SessionDispatchContext.Provider>
        </SessionStateContext.Provider>
    );
};
