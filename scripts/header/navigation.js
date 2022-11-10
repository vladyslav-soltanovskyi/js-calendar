import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
  displayedMonthElem.innerHTML = getDisplayedMonth(getItem('displayedWeekStart'));
}

const onChangeWeek = (event) => {
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  const { target } = event;
  const button = target.closest('[data-direction]');
  const { direction } = button.dataset;

  if (!direction) {
    return;
  }

  let date = getStartOfWeek(getItem('displayedWeekStart'));
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
      date = getStartOfWeek(new Date());
      break;
    }
  }
  
  setItem('displayedWeekStart', date);

  renderWeek();
  renderHeader();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
