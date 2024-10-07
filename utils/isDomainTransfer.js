const domainProductSlugs = {
  TRANSFER_IN: 'domain_transfer',
  // DOTCOM_DOMAIN_REGISTRATION: 'domain_reg',
  // DOMAIN_MOVE_INTERNAL: 'domain_move_internal',
};

export const isDomainTransfer = (product) => {
  return product.product_slug === domainProductSlugs.TRANSFER_IN;
};
