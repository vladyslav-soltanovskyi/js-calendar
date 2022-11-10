import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const headerElem = document.querySelector('.calendar__header');
const createEventButton = document.querySelector('.create-event-btn');
export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
  const datesOfWeek = generateWeekRange(getItem('displayedWeekStart'));
  headerElem.innerHTML = datesOfWeek
    .reduce((template, day, i) => template + (
      `<div class="calendar__day-label day-label">
        <span class="day-label__day-name">${daysOfWeek[i]}</span>
        <span class="day-label__day-number">${day.getDate()}</span>
      </div>`
    ), '');
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
createEventButton.addEventListener('click', openModal);