import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { getDateObj, getStartOfWeek } from '../common/time.utils.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  const { target, clientX, clientY } = event;
  const eventElem = target.closest('.event');
  if (!eventElem) {
    return;
  }
  openPopup(clientX, clientY);
  const { eventId } = eventElem.dataset;
  setItem('eventIdToDelete', eventId);
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
  const eventElems = weekElem.querySelectorAll('.event');
  eventElems.forEach(elem => elem.remove());
}

const createEventElement = ({ id, title, start, end }) => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
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
  const startOfWeek = getDateObj(getStartOfWeek(getItem('displayedWeekStart')));
  const lastDayOfWeek = startOfWeek.day + 6;
  const events = getItem('events');

  return events.filter(eventItem => {
    const eventDateObj = getDateObj(eventItem.start);
    const isCurrentYear = startOfWeek.year === eventDateObj.year;
    const isCurrentMonth = startOfWeek.month === eventDateObj.month;
    const isCurrentDay = startOfWeek.day <= eventDateObj.day && eventDateObj.day <= lastDayOfWeek;
    return isCurrentYear && isCurrentMonth && isCurrentDay;
  });
}

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
  removeEventsFromCalendar();

  const filteredEvents = getFilteredEvents();
  
  filteredEvents.forEach(eventItem => {
    const { day, hours } = getDateObj(eventItem.start);
    const dayElem = weekElem.querySelector(`[data-day="${day}"]`);
    const timeElem = dayElem.querySelector(`[data-time="${hours}"]`);
    timeElem.append(createEventElement(eventItem));
  });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  const eventIdToDelete = getItem('eventIdToDelete');
  const events = getItem('events');
  const filteredEvents = events.filter(({ id }) => id !== +eventIdToDelete);
  setItem('events', filteredEvents);
  renderEvents();
  closePopup();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
