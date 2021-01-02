import moment from 'moment';

export function getTotalWorkDays(startDate, endDate) {
  const day = moment(startDate);
  let businessDays = 0;

  while (day.isSameOrBefore(endDate, 'day')) {
    if (day.day() !== 0 && day.day() !== 6) businessDays += 1;
    day.add(1, 'd');
  }
  return businessDays;
}

export function addBusinessDays(originalDate, numDaysToAdd) {
  const Sunday = 0;
  const Saturday = 6;

  let daysRemaining = numDaysToAdd;
  const newDate = originalDate.clone();
  while (daysRemaining > 0) {
    newDate.add(1, 'days');
    if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
      daysRemaining -= 1;
    }
  }

  return newDate;
}
