import storage from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const headerElem = document.querySelector('.calendar__header');
const createEventButton = document.querySelector('.create-event-btn');

export const renderHeader = () => {
  const datesOfWeek = generateWeekRange(storage.getDisplayedWeekStart());

  headerElem.innerHTML = datesOfWeek
    .reduce((template, day, i) => template + (
      `<div class="calendar__day-label day-label">
        <span class="day-label__day-name">${daysOfWeek[i]}</span>
        <span class="day-label__day-number">${day.getDate()}</span>
      </div>`
    ), '');
};

createEventButton.addEventListener('click', openModal);