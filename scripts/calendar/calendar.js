import storage from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const calendarWeek = document.querySelector('.calendar__week');

const generateDay = () => {
  const hours = createNumbersArray(0, 23);
  return hours.reduce(
    (template, hour) => template + (
      `<div class="calendar__time-slot" data-time="${hour}"></div>`
    ), ''
  )
};

const generateDays = () => {
  const days = generateWeekRange(storage.getDisplayedWeekStart());
  return days.reduce(
    (template, day) => template + (
      `<div class="calendar__day" data-day="${day.getDate()}">${generateDay()}</div>`
    ), ''
  )
};

export const renderWeek = () => {
  calendarWeek.innerHTML = generateDays();
  renderEvents();
};
