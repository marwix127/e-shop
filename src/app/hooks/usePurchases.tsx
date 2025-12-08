import { useState, useEffect } from 'react';
import { Purchase } from '../lib/types';

export function usePurchases() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        const storedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
        setPurchases(storedPurchases);
    }, []);

    const addPurchase = (purchase: Purchase) => {
        const updatedPurchases = [purchase, ...purchases];
        setPurchases(updatedPurchases);
        localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    };

    return { purchases, addPurchase };
}
