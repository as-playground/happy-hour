import { IonBadge } from '@ionic/react';
import React from 'react';
import { Discount } from '../model';

interface DiscountBadgeProps {
    discount: Discount;
    color: string;
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount, color }) => {
    return <IonBadge style={{ '--background': color }}>{discount.name}</IonBadge>;
};

export const NoDiscountBadge: React.FC = () => (
    <IonBadge style={{ '--background': '#FFFFFF', '--color': 'black' }}>No discounts.</IonBadge>
);
