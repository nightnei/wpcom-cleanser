import { request } from './request.js';

export const deleteSite = async (siteId, retryTimes = 0) => {
  const url = `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/delete?http_envelope=1`;

  try {
    const response = await request.dotCom(url, { method: 'POST' });

    if (!response.ok) {
      throw new Error(`Network response was not ok (${siteId})`);
    }

    const json = await response.json();

    if (json.code !== 200) {
      throw json;
    }

    return json.body;
  } catch (error) {
    if (retryTimes > 0) {
      console.warn(`Retrying delete for site ${siteId}, remaining attempts: ${retryTimes}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return deleteSite(siteId, retryTimes - 1);
    } else {
      throw error;
    }
  }
};
