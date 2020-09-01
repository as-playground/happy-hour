import { Reducer } from 'react';
import { Order, Session } from '../../model';
import { now } from '../../util';
import { AddDrinkAction, CreateSessionAction, SessionAction } from './session-actions';

export interface SessionState {
    currentSession: Session;
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

const addDrink = (state: SessionState, action: AddDrinkAction): SessionState => {
    const order: Order = {
        id: state.currentSession.orders.length + 1,
        timestamp: now(),
        drink: action.drink,
        discounts: action.discounts,
    };

    return {
        ...state,
        currentSession: {
            ...state.currentSession,
            orders: [...state.currentSession.orders, order],
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

        case 'addDrinkAction':
            return addDrink(state, action);
    }
};
