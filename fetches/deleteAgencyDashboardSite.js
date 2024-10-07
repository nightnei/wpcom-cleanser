import { request } from './request.js';

export const deleteAgencyDashboardSite = async (myAgencyId, agencySitesId) => {
  const url = `https://public-api.wordpress.com/wpcom/v2/agency/${myAgencyId}/sites/${agencySitesId}`;

  const responses = await request.a4a(url, {
    method: 'DELETE',
  });

  const json = await responses.json();

  return json;
};
