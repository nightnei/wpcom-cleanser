import { request } from './request.js';

export const fetchAgencyDashboardSites = async (agencyId) => {
  const url = `https://public-api.wordpress.com/wpcom/v2/jetpack-agency/sites?agency_id=${agencyId}`;

  let sites = [];
  let page = 1;

  while (true) {
    const response = await request.a4a(`${url}&page=${page}`);
    const json = await response.json();

    if (json.sites.length === 0) {
      break;
    }

    sites = sites.concat(json.sites);
    page++;
  }

  return sites;
};
