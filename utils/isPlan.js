const TYPE_FREE = 'TYPE_FREE';
const PLAN_HOST_BUNDLE = 'host-bundle';
const PLAN_WPCOM_ENTERPRISE = 'wpcom-enterprise';

const PLAN_FREE = 'free_plan';
const PLAN_BLOGGER = 'blogger-bundle';
const PLAN_BLOGGER_2_YEARS = 'blogger-bundle-2y';
const PLAN_PERSONAL_MONTHLY = 'personal-bundle-monthly';
const PLAN_PERSONAL = 'personal-bundle';
const PLAN_PERSONAL_2_YEARS = 'personal-bundle-2y';
const PLAN_PERSONAL_3_YEARS = 'personal-bundle-3y';
const PLAN_PREMIUM_MONTHLY = 'value_bundle_monthly';
const PLAN_PREMIUM = 'value_bundle';
const PLAN_PREMIUM_2_YEARS = 'value_bundle-2y';
const PLAN_PREMIUM_3_YEARS = 'value_bundle-3y';
const PLAN_BUSINESS_MONTHLY = 'business-bundle-monthly';
const PLAN_BUSINESS = 'business-bundle';
const PLAN_BUSINESS_2_YEARS = 'business-bundle-2y';
const PLAN_BUSINESS_3_YEARS = 'business-bundle-3y';
const PLAN_100_YEARS = 'wp_com_hundred_year_bundle_centennially';
const PLAN_ECOMMERCE_MONTHLY = 'ecommerce-bundle-monthly';
const PLAN_ECOMMERCE = 'ecommerce-bundle';
const PLAN_ECOMMERCE_2_YEARS = 'ecommerce-bundle-2y';
const PLAN_ECOMMERCE_3_YEARS = 'ecommerce-bundle-3y';
const PLAN_WOOEXPRESS_MEDIUM_MONTHLY = 'wooexpress-medium-bundle-monthly';
const PLAN_WOOEXPRESS_MEDIUM = 'wooexpress-medium-bundle-yearly';
const PLAN_WOOEXPRESS_SMALL_MONTHLY = 'wooexpress-small-bundle-monthly';
const PLAN_WOOEXPRESS_SMALL = 'wooexpress-small-bundle-yearly';
const PLAN_WOOEXPRESS_PLUS = 'wooexpress-plus'; // Not a real plan;
const PLAN_ENTERPRISE_GRID_WPCOM = 'plan-enterprise-grid-wpcom'; // Not a real plan; we show the VIP section in the plans grid as part of pdgrnI-1Qp-p2.
const PLAN_BLUEHOST_CLOUD = 'bluehost-cloud-bundle'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_BLUEHOST_CLOUD_MONTHLY = 'bluehost-cloud-bundle-monthly'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_BLUEHOST_CLOUD_2Y = 'bluehost-cloud-bundle-2y'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_BLUEHOST_CLOUD_3Y = 'bluehost-cloud-bundle-3y'; // Not a real plan; we show the bluehost section in the landing pages as part of pau2Xa-5rG-p2.
const PLAN_JETPACK_FREE = 'jetpack_free';
const PLAN_JETPACK_PREMIUM = 'jetpack_premium';
const PLAN_JETPACK_PREMIUM_MONTHLY = 'jetpack_premium_monthly';
const PLAN_JETPACK_PERSONAL = 'jetpack_personal';
const PLAN_JETPACK_PERSONAL_MONTHLY = 'jetpack_personal_monthly';
const PLAN_JETPACK_BUSINESS = 'jetpack_business';
const PLAN_JETPACK_BUSINESS_MONTHLY = 'jetpack_business_monthly';
const PLAN_JETPACK_SECURITY_DAILY = 'jetpack_security_daily';
const PLAN_JETPACK_SECURITY_DAILY_MONTHLY = 'jetpack_security_daily_monthly';
const PLAN_JETPACK_SECURITY_REALTIME = 'jetpack_security_realtime';
const PLAN_JETPACK_SECURITY_REALTIME_MONTHLY = 'jetpack_security_realtime_monthly';
const PLAN_JETPACK_COMPLETE_BI_YEARLY = 'jetpack_complete_bi_yearly';
const PLAN_JETPACK_COMPLETE = 'jetpack_complete';
const PLAN_JETPACK_COMPLETE_MONTHLY = 'jetpack_complete_monthly';
const PLAN_JETPACK_SECURITY_T1_BI_YEARLY = 'jetpack_security_t1_bi_yearly';
const PLAN_JETPACK_SECURITY_T1_YEARLY = 'jetpack_security_t1_yearly';
const PLAN_JETPACK_SECURITY_T1_MONTHLY = 'jetpack_security_t1_monthly';
const PLAN_JETPACK_SECURITY_T2_YEARLY = 'jetpack_security_t2_yearly';
const PLAN_JETPACK_SECURITY_T2_MONTHLY = 'jetpack_security_t2_monthly';
const PLAN_JETPACK_STARTER_YEARLY = 'jetpack_starter_yearly';
const PLAN_JETPACK_STARTER_MONTHLY = 'jetpack_starter_monthly';
const PLAN_JETPACK_GOLDEN_TOKEN = 'jetpack_golden_token_lifetime';
const PLAN_P2_PLUS = 'wp_p2_plus_monthly';

const PLANS_LIST = [
  PLAN_FREE,
  PLAN_BLOGGER,
  PLAN_BLOGGER_2_YEARS,
  PLAN_PERSONAL_MONTHLY,
  PLAN_PERSONAL,
  PLAN_PERSONAL_2_YEARS,
  PLAN_PERSONAL_3_YEARS,
  PLAN_PREMIUM_MONTHLY,
  PLAN_PREMIUM,
  PLAN_PREMIUM_2_YEARS,
  PLAN_PREMIUM_3_YEARS,
  PLAN_BUSINESS_MONTHLY,
  PLAN_BUSINESS,
  PLAN_BUSINESS_2_YEARS,
  PLAN_BUSINESS_3_YEARS,
  PLAN_100_YEARS,
  PLAN_ECOMMERCE_MONTHLY,
  PLAN_ECOMMERCE,
  PLAN_ECOMMERCE_2_YEARS,
  PLAN_ECOMMERCE_3_YEARS,
  PLAN_WOOEXPRESS_MEDIUM_MONTHLY,
  PLAN_WOOEXPRESS_MEDIUM,
  PLAN_WOOEXPRESS_SMALL_MONTHLY,
  PLAN_WOOEXPRESS_SMALL,
  PLAN_WOOEXPRESS_PLUS,
  PLAN_ENTERPRISE_GRID_WPCOM,
  PLAN_BLUEHOST_CLOUD,
  PLAN_BLUEHOST_CLOUD_MONTHLY,
  PLAN_BLUEHOST_CLOUD_2Y,
  PLAN_BLUEHOST_CLOUD_3Y,
  PLAN_JETPACK_FREE,
  PLAN_JETPACK_PREMIUM,
  PLAN_JETPACK_PREMIUM_MONTHLY,
  PLAN_JETPACK_PERSONAL,
  PLAN_JETPACK_PERSONAL_MONTHLY,
  PLAN_JETPACK_BUSINESS,
  PLAN_JETPACK_BUSINESS_MONTHLY,
  PLAN_JETPACK_SECURITY_DAILY,
  PLAN_JETPACK_SECURITY_DAILY_MONTHLY,
  PLAN_JETPACK_SECURITY_REALTIME,
  PLAN_JETPACK_SECURITY_REALTIME_MONTHLY,
  PLAN_JETPACK_COMPLETE_BI_YEARLY,
  PLAN_JETPACK_COMPLETE,
  PLAN_JETPACK_COMPLETE_MONTHLY,
  PLAN_JETPACK_SECURITY_T1_BI_YEARLY,
  PLAN_JETPACK_SECURITY_T1_YEARLY,
  PLAN_JETPACK_SECURITY_T1_MONTHLY,
  PLAN_JETPACK_SECURITY_T2_YEARLY,
  PLAN_JETPACK_SECURITY_T2_MONTHLY,
  PLAN_JETPACK_STARTER_YEARLY,
  PLAN_JETPACK_STARTER_MONTHLY,
  PLAN_JETPACK_GOLDEN_TOKEN,
  PLAN_P2_PLUS,
];

const isFreePlan = (slug) => slug === TYPE_FREE;

export function isPlan(product) {
  const slug = product.product_slug;

  if (isFreePlan(slug)) {
    return false;
  }

  switch (slug) {
    case PLAN_HOST_BUNDLE:
    case PLAN_WPCOM_ENTERPRISE:
      return true;
    default:
      return PLANS_LIST.includes(slug);
  }
}
