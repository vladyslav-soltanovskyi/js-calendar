import { createNumbersArray } from '../common/createNumbersArray.js';

const generateSlots = (hours, text) => (
  hours.reduce((template, i) => {
    const isZero = i === 0;
    return template + (
      `<div class="time-slot">
        <div class="time-slot__time">${!isZero ? i : ''} ${!isZero ? text : ''}</div>
      </div>`
    )
  }, '')
);

const scaleTime = document.querySelector('.calendar__time-scale');

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  const hoursInAM = createNumbersArray(0, 12);
  const hoursInPM = createNumbersArray(1, 11);
  const timeSlotsTemplate = generateSlots(hoursInAM, 'AM') + generateSlots(hoursInPM, 'PM');
  scaleTime.innerHTML = timeSlotsTemplate;
};