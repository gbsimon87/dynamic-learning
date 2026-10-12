// A tap within this many kilometres of the city counts as found. At the
// world view one pixel is roughly 40 km, so this leaves a ~20px target -
// generous enough for small fingers.
export const FOUND_WITHIN_KM = 750;

const EARTH_RADIUS_KM = 6371;
const toRad = deg => (deg * Math.PI) / 180;

/** Great-circle distance between two [lat, lng] points, in whole km. */
export function distanceKm([lat1, lng1], [lat2, lng2]) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a))));
}

/**
 * The world repeats sideways on the map, so a tap can land at, say, lng 190.
 * Shift the city by whole turns of 360 to the copy nearest the tap, so the
 * line is drawn between the two points the child can actually see.
 */
export function nearestCopy([lat, lng], [, guessLng]) {
  return [lat, lng + 360 * Math.round((guessLng - lng) / 360)];
}

export function isFound(km) {
  return km <= FOUND_WITHIN_KM;
}
