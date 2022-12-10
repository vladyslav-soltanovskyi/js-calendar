import storage from '../common/storage.js';
import { openPopup, closePopup } from '../common/popup.js';
import { getDateObj, getStartOfWeek } from '../common/time.utils.js';
import api from '../common/api.js';
import { renderTimeLine } from '../calendar/timeLine.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  const { target, clientX, clientY } = event;
  const eventElem = target.closest('.event');
  if (!eventElem) {
    return;
  }
  openPopup(clientX, clientY);
  const { eventId } = eventElem.dataset;
  storage.setEventIdToDelete(eventId);
}

function removeEventsFromCalendar() {
  const eventElems = weekElem.querySelectorAll('.event');
  eventElems.forEach(elem => elem.remove());
}

const createEventElement = ({ id, title, start, end }) => {
  const eventElement = document.createElement('div');
  const startDateObj = getDateObj(start);
  const endDateObj = getDateObj(end);
  const totalMinutesOfEvent = (endDateObj.hours * 60 + endDateObj.minutes) - (startDateObj.hours * 60 + startDateObj.minutes);

  eventElement.dataset.eventId = id;
  eventElement.classList.add('event');
  eventElement.innerHTML = `<div class="event__title">${title}</div>`;
  eventElement.innerHTML += `<div class="event__time">${startDateObj.hours}:${startDateObj.minutes} - ${endDateObj.hours}:${endDateObj.minutes}</div>`;
  eventElement.style.top = `${startDateObj.minutes}px`;
  eventElement.style.height = `${totalMinutesOfEvent}px`;
  
  return eventElement;
};

const getFilteredEvents = () => {
  const startOfWeek = getDateObj(getStartOfWeek(storage.getDisplayedWeekStart()));
  const lastDayOfWeek = startOfWeek.day + 6;
  const events = storage.getEvents();

  return events.filter(eventItem => {
    const eventDateObj = getDateObj(eventItem.start);
    const isCurrentYear = startOfWeek.year === eventDateObj.year;
    const isCurrentMonth = startOfWeek.month === eventDateObj.month;
    const isCurrentDay = startOfWeek.day <= eventDateObj.day && eventDateObj.day <= lastDayOfWeek;
    return isCurrentYear && isCurrentMonth && isCurrentDay;
  });
}

export const renderEvents = () => {
  removeEventsFromCalendar();
  renderTimeLine();
  
  const filteredEvents = getFilteredEvents();
  
  filteredEvents.forEach(eventItem => {
    const { day, hours } = getDateObj(eventItem.start);
    const dayElem = weekElem.querySelector(`[data-day="${day}"]`);
    const timeElem = dayElem.querySelector(`[data-time="${hours}"]`);
    timeElem.append(createEventElement(eventItem));
  });
};

function onDeleteEvent() {
  const eventIdToDelete = storage.getEventIdToDelete();

  api.deleteEvent(eventIdToDelete)
    .then(() => {
      storage.deleteEvent(eventIdToDelete);
      closePopup();
      renderEvents()
    });
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
