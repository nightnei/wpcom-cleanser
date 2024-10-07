export const isAgencyPurchase = (purchase) => {
  if (!purchase.partner_type) {
    return false;
  }

  return ['agency', 'agency_beta', 'a4a_agency'].includes(purchase.partner_type);
};
