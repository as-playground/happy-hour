import React from 'react';
import { Discount } from '../model';
import '../styles/flex-gap.css';
import { DiscountBadge, NoDiscountBadge } from './DiscountBadge';

interface DiscountListProps {
    discounts: Discount[];
}

const colors: { [key: string]: string } = {};

const generateColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const getDiscountColor = (id: string) => {
    if (!colors[id]) {
        colors[id] = generateColor();
    }

    return colors[id];
};

export const DiscountList: React.FC<DiscountListProps> = ({ discounts }) => {
    if (discounts.length === 0) {
        return <NoDiscountBadge />;
    }

    return (
        <div className="flex-gap">
            {discounts.map((discount) => (
                <DiscountBadge key={discount.name} discount={discount} color={getDiscountColor(discount.name)} />
            ))}
        </div>
    );
};
