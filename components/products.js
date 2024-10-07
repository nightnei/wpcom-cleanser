import { getPurchaseName } from '../utils/getPurchaseName.js';
import { getPurchaseDescription } from '../utils/getPurchaseDescription.js';

const wrapper = document.querySelector('.page-content');

export const mountProducts = (purchases, agencyDashboardSites, sites) => {
  if (!purchases.length && !agencyDashboardSites.length && !sites.length) {
    wrapper.innerHTML = `
      <div class="products__you-are-all-set">
        <img src="./imgs/youAreAllSet.png" />
        <div class="products__you-are-all-set-text">No purchases / sites found</div>
      </div>
    `;

    return;
  }

  if (purchases.length) {
    const purchaseList = document.createElement('div');
    purchaseList.className = 'products__purchases';

    const h2 = document.createElement('div');
    h2.className = 'products__h2';
    h2.textContent = 'Purchases:';
    purchaseList.appendChild(h2);

    purchases.forEach((purchase) => {
      const site = sites.find((site) => site.ID === +purchase.blog_id);

      const listItem = document.createElement('div');
      listItem.dataset.id = `purchase_id-${purchase.ID}`;
      listItem.className = 'products__item';
      listItem.innerHTML = `
          <div class="products__item-name">${getPurchaseName(purchase)} (${purchase.ID})</div>
          <div class="products__item-description">
            ${getPurchaseDescription(purchase)}
            ${site?.domain ? ' for <b>' + site.domain + '</b>' : ''}
          </div>
        `;
      purchaseList.appendChild(listItem);
    });

    wrapper.appendChild(purchaseList);
  }

  if (agencyDashboardSites.length) {
    const agencySitesList = document.createElement('div');
    agencySitesList.className = 'products__agency-dashboard-sites';

    const h2 = document.createElement('div');
    h2.className = 'products__h2';
    h2.textContent = 'Sites on "https://agencies.automattic.com/sites" dashboard:';
    agencySitesList.appendChild(h2);

    agencyDashboardSites.forEach((agencyDashboardSite) => {
      const listItem = document.createElement('div');
      listItem.dataset.id = `dashboard-agency_site_id-${agencyDashboardSite.a4a_site_id}`;
      listItem.className = 'products__item';
      listItem.innerHTML = `
          <div class="products__item-name">${agencyDashboardSite.blogname}</div>
          <div class="products__item-description">${agencyDashboardSite.url}</div>
        `;
      agencySitesList.appendChild(listItem);
    });

    wrapper.appendChild(agencySitesList);
  }

  if (sites.length) {
    const sitesList = document.createElement('div');
    sitesList.className = 'products__sites';

    const h2 = document.createElement('div');
    h2.className = 'products__h2';
    h2.textContent = 'Sites:';
    sitesList.appendChild(h2);

    sites.forEach((site) => {
      const listItem = document.createElement('div');
      listItem.dataset.id = `site_id-${site.ID}`;
      listItem.className = 'products__item';
      listItem.innerHTML = `
          <div class="products__item-name">${site.name || site.domain} (${site.ID})</div>
          <div class="products__item-description">${site.domain}</div>
        `;
      sitesList.appendChild(listItem);
    });

    wrapper.appendChild(sitesList);
  }
};

export const unmountProducts = () => {
  wrapper.innerHTML = '';
};
