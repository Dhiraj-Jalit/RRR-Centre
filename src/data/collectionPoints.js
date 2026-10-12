/**
 * Collection Point data and Saturday schedule calculation.
 * Central Municipal Collection Point: Butibori Nagar Parishad Office.
 */

export const collectionPointsData = [
  {
    id: 'btr-nagarpalika',
    nameKey: 'points.point1Title',
    partnerKey: 'points.point1Partner',
    addressKey: 'points.point1Address',
    landmarkKey: 'points.point1Landmark',
    timingsKey: 'points.timingDetails',
    mapQuery: 'Butibori+Nagar+Parishad+Maharashtra',
    directionsUrl: 'https://maps.google.com/?q=Butibori+Municipal+Council+Nagpur+Maharashtra',
    phone: '07103-262100',
    color: 'emerald'
  }
];

/**
 * Calculates collection status:
 * - isTodayCollectionDay: true if today is Saturday
 * - isOpenRightNow: true if today is Saturday and current time is 10:00 - 17:00
 * - nextSaturdayDate: formatted Date of the upcoming Saturday
 */
export function getCollectionScheduleStatus() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
  const hours = now.getHours();

  const isTodaySaturday = dayOfWeek === 6;
  const isOpenRightNow = isTodaySaturday && (hours >= 10 && hours < 17);

  // Compute next Saturday
  let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  // If today is Saturday but past 17:00 (5 PM), next collection is the following Saturday (7 days later)
  if (isTodaySaturday && hours >= 17) {
    daysUntilSaturday = 7;
  } else if (isTodaySaturday && daysUntilSaturday === 0) {
    // Today is Saturday and not yet past 17:00
    daysUntilSaturday = 0;
  }

  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + (daysUntilSaturday === 0 && hours >= 17 ? 7 : daysUntilSaturday));
  nextSaturday.setHours(10, 0, 0, 0);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedNextDate = nextSaturday.toLocaleDateString(undefined, options);

  return {
    isTodaySaturday,
    isOpenRightNow,
    nextSaturdayDate: nextSaturday,
    formattedNextDate,
    daysUntilSaturday
  };
}
