import { storageGet } from '../storage/get.js';

const requestWithAuthorization = async (url, { method = 'GET', authorization }) => {
  return fetch(url, {
    method,
    credentials: 'include', // Ensures cookies are sent with the request
    headers: {
      Authorization: authorization,
    },
  });
};

export const request = {
  dotCom: async (url, params = {}) => {
    const authorizationDotCom = await storageGet('authorizationDotCom');

    return requestWithAuthorization(url, {
      ...params,
      authorization: authorizationDotCom,
    });
  },
  a4a: async (url, params = {}) => {
    const authorizationA4A = await storageGet('authorizationA4A');

    return requestWithAuthorization(url, {
      ...params,
      authorization: authorizationA4A,
    });
  },
};
