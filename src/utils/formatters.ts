export const formatIDR = (price: number) => {
    if (price >= 1_000_000_000_000) {
        return `Rp ${(price / 1_000_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 }).replace(/\.0$/, '')} T`;
    }
    if (price >= 1_000_000_000) {
        return `Rp ${(price / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 }).replace(/\.0$/, '')} M`;
    }
    if (price >= 1_000_000) {
        return `Rp ${(price / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 }).replace(/\.0$/, '')} Jt`;
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(price);
};
