import storage from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import api from '../common/api.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  eventFormElem.reset();
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  event.preventDefault();
  const { title, date, startTime, endTime, description } = Object.fromEntries(new FormData((eventFormElem)));
  const newEvent = {
    title,
    description,
    start: getDateTime(date, startTime),
    end: getDateTime(date, endTime),
  };
  api.createEvent(newEvent)
    .then(event => {
      storage.createEvent(event);
      onCloseEventForm();
      renderEvents();
    });
}

export function initEventForm() {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
