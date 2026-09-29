/**
 * "Something new": badges and stickers earned but not yet looked at.
 *
 * Items are ADDED when earned and CLEARED when the child opens their own
 * Trophy Room, so anything a child owned before this shipped is never
 * "new", and nothing needs every progress document to work it out.
 */
const RECENT = 5;

export const stickerKey = (year, subject, topicId) => `${year}/${subject}/${topicId}`;

export function addNews(rewards, { badges = [], sticker = null } = {}) {
  const ids = badges.map((badge) => (typeof badge === "string" ? badge : badge.id));
  const news = {
    ...rewards.news,
    badges: [...new Set([...rewards.news.badges, ...ids])],
    stickers: sticker ? [...new Set([...rewards.news.stickers, sticker])] : rewards.news.stickers,
  };
  const recentStickers = sticker
    ? [...rewards.recentStickers.filter((key) => key !== sticker), sticker].slice(-RECENT)
    : rewards.recentStickers;
  return { ...rewards, news, recentStickers };
}

export function hasNews(rewards) {
  return rewards.news.badges.length + rewards.news.stickers.length > 0;
}

export function clearNews(rewards) {
  if (!hasNews(rewards)) return rewards;
  return { ...rewards, news: { ...rewards.news, badges: [], stickers: [] } };
}
