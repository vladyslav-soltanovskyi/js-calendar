import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import storage from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import api from './common/api.js';

document.addEventListener('DOMContentLoaded', () => {
  // инициализация всех элементов
  renderTimescale();
  storage.setDisplayedWeekStart(getStartOfWeek(new Date()));
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  
  api.getEvents()
    .then(events => {
      storage.setEvents(events);
      renderWeek();
      renderHeader();
    });
});
