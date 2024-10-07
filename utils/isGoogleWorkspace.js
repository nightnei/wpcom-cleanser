const GOOGLE_WORKSPACE_BUSINESS_STARTER_MONTHLY = 'wp_google_workspace_business_starter_monthly';
const GOOGLE_WORKSPACE_BUSINESS_STARTER_YEARLY = 'wp_google_workspace_business_starter_yearly';

export function isGoogleWorkspace(product) {
  return [GOOGLE_WORKSPACE_BUSINESS_STARTER_MONTHLY, GOOGLE_WORKSPACE_BUSINESS_STARTER_YEARLY].includes(product.product_slug);
}
