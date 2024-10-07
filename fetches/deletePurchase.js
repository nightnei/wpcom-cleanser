import { request } from './request.js';

export const deletePurchase = async (purchaseId) => {
  const url = `https://public-api.wordpress.com/wpcom/v2/purchases/${purchaseId}/delete?_envelope=1`;

  const response = await request.dotCom(url, { method: 'POST' });

  if (!response.ok) {
    throw new Error(`Network response was not ok (${purchaseId})`);
  }

  const json = await response.json();

  if (json.status !== 200) {
    throw json;
  }

  return json.body;
};
