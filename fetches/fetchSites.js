import { request } from './request.js';
import { storageGet } from '../storage/get.js';

const SITE_REQUEST_FIELDS = [
  'ID',
  'URL',
  // 'capabilities',
  // 'icon',
  // 'is_multisite',
  // 'is_private',
  // 'is_coming_soon',
  // 'is_vip',
  // 'jetpack',
  // 'jetpack_modules',
  'name',
  // 'options',
  // 'plan',
  // 'products',
  // 'single_user_site',
  // 'visible',
  // 'lang',
  // 'launch_status',
  // 'site_migration',
  'site_owner',
  // 'is_core_site_editor_enabled',
  // 'is_wpcom_atomic',
  // 'is_wpcom_staging_site',
  // 'was_ecommerce_trial',
  // 'was_migration_trial',
  // 'was_upgraded_from_trial',
  // 'was_hosting_trial',
  // 'description',
  // 'user_interactions',
  'is_deleted',
  // 'is_a4a_client',
  // 'is_a4a_dev_site',
].join('%2C');

export const SITE_REQUEST_OPTIONS = [
  'admin_url',
  'advanced_seo_front_page_description',
  'advanced_seo_title_formats',
  'allowed_file_types',
  'anchor_podcast',
  'created_at',
  'default_comment_status',
  'default_ping_status',
  'default_post_format',
  'design_type',
  'editing_toolkit_is_active',
  'frame_nonce',
  'gmt_offset',
  'has_pending_automated_transfer',
  'is_automated_transfer',
  'is_cloud_eligible',
  'is_domain_only',
  'is_mapped_domain',
  'is_redirect',
  'is_wpcom_atomic',
  'is_wpcom_store',
  'is_wpforteams_site',
  'p2_hub_blog_id',
  'jetpack_frame_nonce',
  'jetpack_version',
  'main_network_site',
  'page_on_front',
  'page_for_posts',
  'podcasting_archive',
  'podcasting_category_id',
  'publicize_permanently_disabled',
  'restricted_tld',
  'show_on_front',
  'site_segment',
  'software_version',
  'timezone',
  'updated_at',
  'upgraded_filetypes_enabled',
  'unmapped_url',
  'verification_services_codes',
  'videopress_enabled',
  'woocommerce_is_active',
  'wordads',
  'site_creation_flow',
  'site_source_slug',
  'is_difm_lite_in_progress',
  'site_intent',
  'theme_slug',
  'launchpad_screen',
  'launchpad_checklist_tasks_statuses',
  'wpcom_production_blog_id',
  'wpcom_staging_blog_ids',
  'can_blaze',
  'is_commercial',
  'is_commercial_reasons',
  'wpcom_admin_interface',
  'wpcom_classic_early_release',

  'domain',
].join('%2C');

export const fetchSites = async (userId) => {
  const url = `https://public-api.wordpress.com/rest/v1.2/me/sites?http_envelope=1&site_visibility=all&include_domain_only=true&site_activity=active&fields=${SITE_REQUEST_FIELDS}&options=${SITE_REQUEST_OPTIONS}`;

  const response = await request.dotCom(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const { body } = await response.json();

  if (body.message) {
    throw body;
  }

  const { sites } = body;

  const ignoredSites = await storageGet('ignoredSites');
  const ignoredSitesList = ignoredSites
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  const filteredSites = sites.filter((site) => {
    const isDeleted = site.is_deleted;
    const isMySite = site.site_owner === userId;
    const isIgnored = ignoredSitesList.includes(site.ID.toString());

    return !isDeleted && isMySite && !isIgnored;
  });

  filteredSites.forEach((site) => {
    site.domain = site.URL.replace(/^https?:\/\//, '');
    site.slug = site.domain.replace(/\//g, '::');
  });

  return filteredSites;
};
