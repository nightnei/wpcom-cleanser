import { hasAmountAvailableToRefund } from '../utils/hasAmountAvailableToRefund.js';
import { request } from './request.js';
import { storageGet } from '../storage/get.js';

export const fetchPurchases = async () => {
  const url = 'https://public-api.wordpress.com/rest/v1.1/me/purchases?http_envelope=1';

  const response = await request.dotCom(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const { body } = await response.json();
  let filteredPurchases = body;

  const ignoredSubscriptions = await storageGet('ignoredSubscriptions');
  if (ignoredSubscriptions) {
    const ignoredSubscriptionsList = ignoredSubscriptions.split(',').map((id) => id.trim());

    filteredPurchases = filteredPurchases.filter((purchase) => {
      return !ignoredSubscriptionsList.includes(purchase.ID);
    });
  }

  // !!! This extension should work only with purchases that are bought with Free credits, at least ATM.
  // Later we can handle real purchases too.
  filteredPurchases = filteredPurchases.filter((purchase) => {
    const refundable = hasAmountAvailableToRefund(purchase);

    return !refundable;
  });

  filteredPurchases = filteredPurchases.map((purchase) => {
    const { auto_renew, ...sanitizedData } = purchase;
    return {
      ...sanitizedData,
      is_auto_renew_enabled: parseInt(auto_renew ?? '') === 1,
    };
  });

  return filteredPurchases;
};
