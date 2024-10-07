import { isDomainRegistration } from './isDomainRegistration.js';

export function getPurchaseName(purchase) {
  // TODO: later add check for "isDomainMapping"
  // if (isDomainRegistration(purchase) || isDomainMapping(purchase)) {
  if (isDomainRegistration(purchase)) {
    return purchase.meta ?? '';
  }

  return purchase.product_name;
}
