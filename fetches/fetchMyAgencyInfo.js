import { request } from './request.js';
import { storageGet } from '../storage/get.js';

export const fetchMyAgencyInfo = async () => {
  const url = 'https://public-api.wordpress.com/wpcom/v2/agency';

  const response = await request.a4a(url);

  if (response.status === 403) {
    const authorizationA4A = await storageGet('authorizationA4A');

    if (authorizationA4A === '') {
      // if a Code Wrangler hasn't provided the token yet - we should not consider it as error
      return;
    } else {
      throw new Error('authorization_a4a_not_valid');
    }
  }

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  return json;
};
