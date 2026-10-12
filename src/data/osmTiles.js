/**
 * OpenStreetMap's volunteer tile servers block requests with no Referer
 * (https://operations.osmfoundation.org/policies/tiles/). The app sets
 * `no-referrer` page-wide, so these tiles opt back in to sending just the
 * origin - never the path. Attribution is also required by the policy.
 */
export const OSM_TILES = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; OpenStreetMap contributors',
  referrerPolicy: 'strict-origin-when-cross-origin',
};
