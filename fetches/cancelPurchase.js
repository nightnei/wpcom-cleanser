import { request } from './request.js';

export const cancelPurchase = async (purchaseId) => {
  const url = `https://public-api.wordpress.com/rest/v1.1/upgrades/${purchaseId}/disable-auto-renew?http_envelope=1`;

  const response = await request.dotCom(url, { method: 'POST' });

  if (!response.ok) {
    throw new Error(`Network response was not ok (${purchaseId})`);
  }

  const json = await response.json();

  if (!json.body.success) {
    throw new Error(`Request was not successful (${purchaseId})`);
  }

  return json.body;
};
