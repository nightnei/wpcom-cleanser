import { storageSet } from '../storage/set.js';
import { refreshApp } from './app.js';

export const mountHeader = () => {
  document.querySelector('.btn-toggle-settings').addEventListener('click', () => {
    document.querySelector('.page-header__dropdown').classList.toggle('page-header__dropdown--is-open');
  });

  // mount authorizationDotCom input
  chrome.storage.local.get('authorizationDotCom', function (result) {
    if (result.authorizationDotCom === undefined) {
      chrome.storage.local.set({ authorizationDotCom: '' }, function () {
        console.log('Token initialized (authorizationDotCom)');
      });
    }

    const authorizationDotCom = result.authorizationDotCom || '';

    const input = document.createElement('input');
    input.className = 'page-header__input';
    input.dataset.id = 'authorizationDotCom';
    input.value = authorizationDotCom;
    input.placeholder = 'X-WPTOKEN...';

    const label = document.createElement('label');
    label.className = 'page-header__label';
    label.innerHTML = 'Authorization Header (dotCom): *';
    label.appendChild(input);

    const hint = document.createElement('div');
    hint.innerHTML = `
      Open Network tab of DevTools at https://wordpress.com/ and copy Authorization Header from any request
      <br />
      It's mandatory to have this token to fetch purchases and other info from the API to work with the extension
      <br />
      <a
        href="https://github.com/nightnei/wpcom-cleanser#usage-instructions"
        target="_blank"
        style="font-weight: bold"
      >
        How to do it?
      </a>
    `;
    hint.className = 'page-header__hint';
    label.appendChild(hint);

    document.querySelector('.page-header__dropdown-content').appendChild(label);
  });

  // mount ignored subscriptions input
  chrome.storage.local.get('ignoredSubscriptions', function (result) {
    if (result.ignoredSubscriptions === undefined) {
      chrome.storage.local.set({ ignoredSubscriptions: '' }, function () {
        console.log('ignoredSubscriptions initialized');
      });
    }

    const ignoredSubscriptions = result.ignoredSubscriptions || '';

    const input = document.createElement('input');
    input.className = 'page-header__input';
    input.dataset.id = 'ignoredSubscriptions';
    input.value = ignoredSubscriptions;
    input.placeholder = '19289844, 24082195';

    const label = document.createElement('label');
    label.className = 'page-header__label';
    label.innerHTML = 'Ignored subscriptions:';
    label.appendChild(input);

    const hint = document.createElement('div');
    hint.innerHTML = 'Comma separated list of subscription IDs that you want to ignore';
    hint.className = 'page-header__hint';
    label.appendChild(hint);

    document.querySelector('.page-header__dropdown-content').appendChild(label);
  });

  // mount ignored sites input
  chrome.storage.local.get('ignoredSites', function (result) {
    if (result.ignoredSites === undefined) {
      chrome.storage.local.set({ ignoredSites: '' }, function () {
        console.log('ignoredSites initialized');
      });
    }

    const ignoredSites = result.ignoredSites || '';

    const input = document.createElement('input');
    input.className = 'page-header__input';
    input.dataset.id = 'ignoredSites';
    input.value = ignoredSites;
    input.placeholder = '234615886, 233677396';

    const label = document.createElement('label');
    label.className = 'page-header__label';
    label.innerHTML = 'Ignored sites:';
    label.appendChild(input);

    const hint = document.createElement('div');
    hint.innerHTML = 'Comma separated list of site IDs that you want to ignore';
    hint.className = 'page-header__hint';
    label.appendChild(hint);

    document.querySelector('.page-header__dropdown-content').appendChild(label);
  });

  // mount authorizationA4A input
  chrome.storage.local.get('authorizationA4A', function (result) {
    if (result.authorizationA4A === undefined) {
      chrome.storage.local.set({ authorizationA4A: '' }, function () {
        console.log('Token initialized (authorizationA4A)');
      });
    }

    const authorizationA4A = result.authorizationA4A || '';

    const input = document.createElement('input');
    input.className = 'page-header__input';
    input.dataset.id = 'authorizationA4A';
    input.value = authorizationA4A;
    input.placeholder = 'Bearer...';

    const label = document.createElement('label');
    label.className = 'page-header__label';
    label.innerHTML = 'Authorization Header (A4A):';
    label.appendChild(input);

    const hint = document.createElement('div');
    hint.innerHTML = `
      Open Network tab of DevTools at https://agencies.automattic.com/ and copy Authorization Header from any request.
      <br />
      This will allow you to delete sites listed on https://agencies.automattic.com/sites
    `;
    hint.className = 'page-header__hint';
    label.appendChild(hint);

    document.querySelector('.page-header__dropdown-content').appendChild(label);
  });

  // mount save btn
  const btnSaveSettings = document.createElement('button');
  btnSaveSettings.className = 'btn-save-settings';
  btnSaveSettings.innerHTML = 'Save settings';
  btnSaveSettings.addEventListener('click', async () => {
    document.querySelectorAll('.page-header__dropdown-content .page-header__error').forEach((error) => error.remove());

    const authorizationDotCom = document.querySelector('input[data-id="authorizationDotCom"]').value;
    await storageSet('authorizationDotCom', authorizationDotCom);

    const ignoredSubscriptions = document.querySelector('input[data-id="ignoredSubscriptions"]').value;
    await storageSet('ignoredSubscriptions', ignoredSubscriptions);

    const ignoredSites = document.querySelector('input[data-id="ignoredSites"]').value;
    await storageSet('ignoredSites', ignoredSites);

    const authorizationA4A = document.querySelector('input[data-id="authorizationA4A"]').value;
    await storageSet('authorizationA4A', authorizationA4A);

    refreshApp();

    document.querySelector('.page-header__dropdown').classList.remove('page-header__dropdown--is-open');
  });
  document.querySelector('.page-header__dropdown-btns').appendChild(btnSaveSettings);
};
