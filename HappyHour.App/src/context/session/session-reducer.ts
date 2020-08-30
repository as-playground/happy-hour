import { Reducer } from 'react';
import { Session } from '../../model';
import { CreateSessionAction, SessionAction } from './session-actions';

export interface SessionState {
    currentSession?: Session;
}

const createSession = (state: SessionState, action: CreateSessionAction): SessionState => {
    return {
        ...state,
        currentSession: {
            timestamp: action.timestamp,
            orders: [],
        },
    };
};

export const SessionReducer: Reducer<SessionState, SessionAction> = (
    state: SessionState,
    action: SessionAction
): SessionState => {
    switch (action.type) {
        case 'createSessionAction':
            return createSession(state, action);

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
