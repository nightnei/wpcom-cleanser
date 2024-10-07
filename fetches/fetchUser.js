import { request } from './request.js';

export const fetchUser = async () => {
  const url = 'https://public-api.wordpress.com/rest/v1.1/me?http_envelope=1&meta=flags';

  const response = await request.dotCom(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  return json.body;
};
