import { IonBadge } from '@ionic/react';
import React from 'react';
import { Discount } from '../model';

interface BarMenuItemDiscountsProps {
    discounts: Discount[];
}

export const BarMenuItemDiscounts: React.FC<BarMenuItemDiscountsProps> = ({ discounts }) => {
    return (
        <div className="flex">
            {discounts.map((discount) => (
                <IonBadge key={discount.name}>{discount.name}</IonBadge>
            ))}
        </div>
    );
};
