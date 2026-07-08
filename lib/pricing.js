import { PROMO_CODES } from './defaults';

export function findDestination(destinations, slug) {
  return destinations.find((d) => d.slug === slug) || null;
}

export function applyPromoCode(priceEur, code) {
  if (!code) return { finalPrice: priceEur, discount: 0, valid: false };
  const key = code.trim().toUpperCase();
  const discountRate = PROMO_CODES[key];
  if (!discountRate) return { finalPrice: priceEur, discount: 0, valid: false };
  const discount = priceEur * discountRate;
  return { finalPrice: Math.round((priceEur - discount) * 100) / 100, discount, valid: true };
}

export function formatPrice(priceEur, currency, eurToAllRate) {
  if (currency === 'ALL') {
    const all = Math.round(priceEur * (eurToAllRate || 100));
    return `${all.toLocaleString('en-US')} L`;
  }
  return `${priceEur}€`;
}
