import { createNumbersArray } from '../common/createNumbersArray.js';

const generateSlots = (hours) => (
  hours.reduce((template, i) => {
    const hour = i > 9 ? i : `0${i}`;
    return template + (
      `<div class="time-slot">
        <div class="time-slot__time">${hour}:00</div>
      </div>`
    )
  }, '')
);

const scaleTime = document.querySelector('.calendar__time-scale');

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  const hours = createNumbersArray(0, 23);
  scaleTime.innerHTML = generateSlots(hours);
};