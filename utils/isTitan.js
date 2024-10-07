const TITAN_MAIL_MONTHLY_SLUG = 'wp_titan_mail_monthly';
const TITAN_MAIL_YEARLY_SLUG = 'wp_titan_mail_yearly';
const TITAN_MAIL_SLUGS = [TITAN_MAIL_MONTHLY_SLUG, TITAN_MAIL_YEARLY_SLUG];

export function isTitan(product) {
  return TITAN_MAIL_SLUGS.includes(product.product_slug);
}
