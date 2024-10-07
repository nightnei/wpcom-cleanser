import { isDomainTransfer } from './isDomainTransfer.js';
import { hasAmountAvailableToRefund } from './hasAmountAvailableToRefund.js';

const isIncludedWithPlan = (purchase) => {
  return purchase.expiry_status === 'included';
};

const isExpired = (purchase) => {
  return purchase.expiry_status === 'expired';
};

export const canAutoRenewBeTurnedOff = (purchase) => {
  if (isIncludedWithPlan(purchase)) {
    return false;
  }

  if (isExpired(purchase)) {
    return false;
  }

  if (isDomainTransfer(purchase) && !hasAmountAvailableToRefund(purchase)) {
    return false;
  }

  if (hasAmountAvailableToRefund(purchase)) {
    return true;
  }

  return purchase.is_auto_renew_enabled;
};
