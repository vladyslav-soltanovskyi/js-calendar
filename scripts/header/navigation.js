import storage from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth, getWeekStartDate } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  displayedMonthElem.innerHTML = getDisplayedMonth(storage.getDisplayedWeekStart());
}

const onChangeWeek = (event) => {
  const { target } = event;
  const button = target.closest('[data-direction]');
  
  if (!button?.dataset.direction) {
    return;
  }

  const { direction } = button.dataset;

  let date = getStartOfWeek(storage.getDisplayedWeekStart());
  const dayOfMonth = date.getDate();
  
  switch(direction) {
    case 'prev': {
      date.setDate(dayOfMonth - 7);
      break;
    }
    case 'next': {
      date.setDate(dayOfMonth + 7);
      break;
    }
    case 'today': {
      date = getWeekStartDate();
      break;
    }
  }
  
  storage.setDisplayedWeekStart(date)

  renderWeek();
  renderHeader();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
