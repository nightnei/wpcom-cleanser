import { fetchUser } from '../fetches/fetchUser.js';
import { fetchSites } from '../fetches/fetchSites.js';
import { fetchPurchases } from '../fetches/fetchPurchases.js';
import { fetchMyAgencyInfo } from '../fetches/fetchMyAgencyInfo.js';
import { fetchAgencyDashboardSites } from '../fetches/fetchAgencyDashboardSites.js';
import { mountLoader, unmountLoader } from './loader.js';
import { mountHeader } from './header.js';
import { mountControls, unmountControls } from './controls.js';
import { mountProducts, unmountProducts } from './products.js';

export const initiateApp = async () => {
  mountHeader();

  refreshApp();
};

export const refreshApp = async () => {
  unmountControls();
  unmountProducts();

  mountLoader();

  let sites, purchases;
  try {
    const user = await fetchUser();
    sites = await fetchSites(user.ID);
    purchases = await fetchPurchases();
  } catch (error) {
    let text;
    if (error.error === 'authorization_required') {
      text = 'Open "Settings" (top right corner of the extension) and provide up-to-date <b>Authorization Header (dotCom)</b>.';
    } else {
      text = `Error: ${error.message}`;
    }

    const errorNode = document.createElement('div');
    errorNode.innerHTML = 'Authorization Header is not valid anymore. Please, provide a new one.';
    errorNode.className = 'page-header__error';
    document.querySelector('input[data-id="authorizationDotCom"]').parentNode.appendChild(errorNode);

    document.querySelector('.page-content').innerHTML = `
      <div class="error">
        ${text}
      </div>
    `;

    console.error('There was a problem with the fetch operation:', error.message);
  }

  let myAgencyId,
    agencyDashboardSites = [];
  try {
    const myAgencyInfo = await fetchMyAgencyInfo();
    if (myAgencyInfo) {
      myAgencyId = myAgencyInfo[0].id;
      agencyDashboardSites = await fetchAgencyDashboardSites(myAgencyId);
    }
  } catch (error) {
    let text;
    if (error.message === 'authorization_a4a_not_valid') {
      text = 'Authorization Header is not valid anymore. Please, provide a new one.';
    } else {
      text = `Error: ${error.message}`;
    }

    const errorNode = document.createElement('div');
    errorNode.innerHTML = text;
    errorNode.className = 'page-header__error';
    document.querySelector('input[data-id="authorizationA4A"]').parentNode.appendChild(errorNode);
  }

  unmountLoader();

  mountControls(purchases, { myAgencyId, agencyDashboardSites }, sites);
  mountProducts(purchases, agencyDashboardSites, sites);
};
