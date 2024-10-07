import { isTitan } from '../utils/isTitan.js';
import { isPlan } from '../utils/isPlan.js';
import { isGoogleWorkspace } from '../utils/isGoogleWorkspace.js';
import { isDomainRegistration } from '../utils/isDomainRegistration.js';
import { hasAmountAvailableToRefund } from '../utils/hasAmountAvailableToRefund.js';
import { cancelPurchase } from '../fetches/cancelPurchase.js';
import { deletePurchase } from '../fetches/deletePurchase.js';
import { deleteAgencyDashboardSite } from '../fetches/deleteAgencyDashboardSite.js';
import { deleteSite } from '../fetches/deleteSite.js';
import { refreshApp } from './app.js';
import { waitFor } from '../utils/waitFor.js';
import { isPartnerPurchase } from '../utils/isPartnerPurchase.js';
import { isAgencyPurchase } from '../utils/isAgencyPurchase.js';
import { canAutoRenewBeTurnedOff } from '../utils/canAutoRenewBeTurnedOff.js';

export const mountControls = (purchases, { myAgencyId, agencyDashboardSites }, sites) => {
  const handleRemovePurchases = async (purchasesToRemove, agencyDashboardSitesToRemove, sitesToRemove) => {
    const result = {
      successes: [],
      fails: [],
    };

    const renderProgressInfo = () => {
      document.querySelector('.page-controls').innerHTML = '';

      const progressInfo = document.createElement('div');
      progressInfo.innerHTML = `
        <div class="progress-info">
          <div>Handled <b>${result.successes.length + result.fails.length}</b> items out of <b>${purchasesToRemove.length + agencyDashboardSitesToRemove.length + sitesToRemove.length}</b></div>
          <div><b>${result.successes.length}</b> successes</div>
          <div><b>${result.fails.length}</b> fails</div>
          ${result.successes.length + result.fails.length === purchasesToRemove.length + agencyDashboardSitesToRemove.length + sitesToRemove.length ? '<button class="btn-reload" style="width: 100px;">Ok</button>' : '<div>Processing...</div>'}
        </div>
      `;

      document.querySelector('.page-controls').appendChild(progressInfo);

      document.querySelector('.btn-reload')?.addEventListener('click', refreshApp);
    };

    renderProgressInfo();

    for (let i = 0; i < purchasesToRemove.length; i++) {
      const purchase = purchasesToRemove[i];

      const node = document.querySelector(`.products__item[data-id="purchase_id-${purchase.ID}"]`);
      node.classList.add('products__item--removing');
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });

      try {
        if (canAutoRenewBeTurnedOff(purchase)) {
          await cancelPurchase(purchase.ID); // maybe we don't need it, I just decided to replicate the original flow from the website
        }
        await deletePurchase(purchase.ID);

        result.successes.push({ type: 'purchase', id: purchase.ID });

        node.classList.remove('products__item--removing');
        node.classList.add('products__item--removed');
        setTimeout(() => {
          node.remove();

          if (!document.querySelectorAll('[data-id^="purchase_id-"]').length) {
            document.querySelector('.products__purchases').remove();
          }
        }, 2000);
      } catch (error) {
        console.error(error);
        result.fails.push({ type: 'purchase', id: purchase.ID, error: error.message });

        node.classList.remove('products__item--removing');
        node.classList.add('products__item--error');

        await waitFor(2000);
      }

      renderProgressInfo();
    }

    for (let i = 0; i < agencyDashboardSitesToRemove.length; i++) {
      const agencyDashboardSite = agencyDashboardSitesToRemove[i];
      const node = document.querySelector(`.products__item[data-id="dashboard-agency_site_id-${agencyDashboardSite.a4a_site_id}"]`);
      node.classList.add('products__item--removing');
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });

      try {
        await deleteAgencyDashboardSite(myAgencyId, agencyDashboardSite.a4a_site_id);

        result.successes.push({ type: 'a4aDashboardSite', id: agencyDashboardSite.a4a_site_id });

        node.classList.remove('products__item--removing');
        node.classList.add('products__item--removed');
        setTimeout(() => {
          node.remove();

          if (!document.querySelectorAll('[data-id^="dashboard-agency_site_id-"]').length) {
            document.querySelector('.products__agency-dashboard-sites').remove();
          }
        }, 2000);
      } catch (error) {
        console.error(error);
        result.fails.push({ type: 'a4aDashboardSite', id: agencyDashboardSite.a4a_site_id, error: error.message });

        node.classList.remove('products__item--removing');
        node.classList.add('products__item--error');

        await waitFor(2000);
      }

      renderProgressInfo();
    }

    for (let i = 0; i < sitesToRemove.length; i++) {
      const site = sitesToRemove[i];
      const node = document.querySelector(`.products__item[data-id="site_id-${site.ID}"]`);
      node.classList.add('products__item--removing');
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });

      try {
        const retryTimes = 5;

        await deleteSite(site.ID, retryTimes);

        result.successes.push({ type: 'site', id: site.ID });

        node.classList.remove('products__item--removing');
        node.classList.add('products__item--removed');
        setTimeout(() => {
          node.remove();

          if (!document.querySelectorAll('[data-id^="site_id-"]').length) {
            document.querySelector('.products__sites').remove();
          }
        }, 2000);
      } catch (error) {
        console.error(error);
        result.fails.push({ type: 'site', id: site.ID, error: error.message });

        node.classList.remove('products__item--removing');
        node.classList.add('products__item--error');

        await waitFor(2000);
      }

      renderProgressInfo();
    }

    // purchasesToRemove.forEach(async (purchase) => {
    //   const refundable = hasAmountAvailableToRefund(purchase);

    //   if (refundable) {
    //     // TODO(cancelAndRefund): We don't handle refunds yet. Actually all such purchases is filtered in fetchPurchases.js
    //     // wpcom.req.post( {
    //     //   path: `/purchases/${ purchase.id }/cancel`,
    //     //   body: {
    //     //     product_id: purchase.productId,
    //     //     cancel_bundled_domain: cancelBundledDomain ? 1 : 0,
    //     //   },
    //     //   apiNamespace: 'wpcom/v2',
    //     // } );
    //   } else {
    //     // just cancel
    //     await cancelPurchase(purchase.id); // maybe we don't need it, I just decided to replicate the original flow from the website
    //     await deletePurchase(purchase.id);
    //   }
    // });
  };

  const controlsFragment = document.createDocumentFragment();

  const titanPurchases = purchases.filter(isTitan);
  const googleWorkspacePurchases = purchases.filter(isGoogleWorkspace);
  const a4aPurchases = purchases.filter((purchase) => isPartnerPurchase(purchase) && isAgencyPurchase(purchase));
  const planPurchases = purchases.filter((purchase) => isPlan(purchase) && !(isPartnerPurchase(purchase) && isAgencyPurchase(purchase)));
  const domainRegistration = purchases.filter(isDomainRegistration);

  let purchasesToDelete = [];
  let agencyDashboardSitesToRemove = [];
  let sitesToRemove = [];

  const productsData = [
    {
      purchases: titanPurchases,
      postfix: 'Titan purchases',
    },
    {
      purchases: googleWorkspacePurchases,
      postfix: 'Google Workspace purchases',
    },
    {
      purchases: domainRegistration,
      postfix: 'domain purchases',
    },
    {
      purchases: planPurchases,
      postfix: 'plan purchases',
    },
    {
      purchases: a4aPurchases,
      postfix: 'plan purchases for A4A sites',
    },
    {
      agencyDashboardSites: agencyDashboardSites,
      postfix: 'sites on "https://agencies.automattic.com/sites" dashboard',
    },
    {
      sites,
      postfix: 'sites',
    },
  ];

  const updateBtnRemoveState = (btn) => {
    const btnRemove = btn || document.querySelector('.btn-remove');

    if (purchasesToDelete.length || agencyDashboardSitesToRemove.length || sitesToRemove.length) {
      btnRemove.disabled = false;
    } else {
      btnRemove.disabled = true;
    }

    btnRemove.textContent = `Remove ${purchasesToDelete.length + agencyDashboardSitesToRemove.length + sitesToRemove.length} items`;
  };

  productsData.forEach(({ purchases, agencyDashboardSites, sites, postfix }) => {
    if (purchases?.length) {
      const label = document.createElement('label');
      label.innerHTML = `${purchases.length} ${postfix}`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
          purchasesToDelete.push(...purchases);
        } else {
          purchasesToDelete = purchasesToDelete.filter((purchase) => !purchases.includes(purchase));
        }

        updateBtnRemoveState();
      });
      label.prepend(checkbox);
      controlsFragment.appendChild(label);
    }

    if (agencyDashboardSites?.length) {
      const label = document.createElement('label');
      label.innerHTML = `${agencyDashboardSites.length} sites on "https://agencies.automattic.com/sites" dashboard`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
          agencyDashboardSitesToRemove.push(...agencyDashboardSites);
        } else {
          agencyDashboardSitesToRemove = [];
        }

        updateBtnRemoveState();
      });
      label.prepend(checkbox);
      controlsFragment.appendChild(label);
    }

    if (sites?.length) {
      const label = document.createElement('label');
      label.innerHTML = `${sites.length} sites`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
          sitesToRemove.push(...sites);
        } else {
          sitesToRemove = [];
        }

        updateBtnRemoveState();
      });
      label.prepend(checkbox);
      controlsFragment.appendChild(label);
    }
  });

  const showRemoveBtn = productsData.some(({ purchases, agencyDashboardSites, sites }) => purchases?.length || agencyDashboardSites?.length || sites?.length);
  if (showRemoveBtn) {
    controlsFragment.appendChild(document.createElement('br'));

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn-remove');
    removeButton.addEventListener('click', () => {
      if (purchasesToDelete.length || agencyDashboardSitesToRemove.length || sitesToRemove.length) {
        handleRemovePurchases(purchasesToDelete, agencyDashboardSitesToRemove, sitesToRemove);
      }
    });
    controlsFragment.appendChild(removeButton);

    updateBtnRemoveState(removeButton);
  }

  document.querySelector('.page-controls').appendChild(controlsFragment);

  if (showRemoveBtn) {
    document.querySelectorAll('.page-controls label').forEach((label) => label.click());
  }
};

export const unmountControls = () => {
  document.querySelector('.page-controls').innerHTML = '';
};
