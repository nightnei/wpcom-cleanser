import { isGoogleWorkspace } from './isGoogleWorkspace.js';
import { isTitan } from './isTitan.js';
import { isPlan } from './isPlan.js';
import { isDomainRegistration } from './isDomainRegistration.js';
import { isPartnerPurchase } from './isPartnerPurchase.js';
import { isAgencyPurchase } from './isAgencyPurchase.js';

export function getPurchaseDescription(purchase) {
  // if ( isThemePurchase( purchase ) ) {
  // 	return i18n.translate( 'Premium Theme' );
  // }

  // if ( isConciergeSession( purchase ) ) {
  // 	return i18n.translate( 'One-on-one Support' );
  // }

  if (isPartnerPurchase(purchase)) {
    if (isAgencyPurchase(purchase)) {
      return 'Agency Managed Plan';
    }

    // 	return i18n.translate( 'Host Managed Plan' );
  }

  if (isPlan(purchase)) {
    return 'Site Plan';
  }

  if (isDomainRegistration(purchase)) {
    return purchase.product_name;
  }

  // if ( isDomainMapping( purchase ) ) {
  // 	return purchase.productName;
  // }

  // if ( isAkismetProduct( purchase ) ) {
  // 	return null;
  // }

  // if ( isMarketplaceTemporarySitePurchase( purchase ) ) {
  // 	return null;
  // }

  if (isGoogleWorkspace(purchase)) {
    return `Mailboxes and Productivity Tools at ${purchase.meta}`;
  }

  if (isTitan(purchase)) {
    return `Mailboxes at ${purchase.meta}`;
  }

  // if ( purchase.productType === 'marketplace_plugin' || purchase.productType === 'saas_plugin' ) {
  // 	return i18n.translate( 'Plugin' );
  // }

  // if ( purchase.meta ) {
  // 	return purchase.meta;
  // }

  return null;
}
