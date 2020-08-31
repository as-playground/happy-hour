export interface CreateSessionAction {
    type: 'createSessionAction';
    timestamp: Date;
}

export type SessionAction = CreateSessionAction;

export type SessionDispatch = (action: SessionAction) => void;
