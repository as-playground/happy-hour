import { Discount, Drink } from './../../model';

export interface CreateSessionAction {
    type: 'createSessionAction';
    timestamp: Date;
}

export interface AddDrinkAction {
    type: 'addDrinkAction';
    drink: Drink;
    discounts: Discount[];
}

export type SessionAction = CreateSessionAction | AddDrinkAction;

export type SessionDispatch = (action: SessionAction) => void;
