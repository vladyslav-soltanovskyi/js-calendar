import { getDateObj } from '../common/time.utils.js';

const minute = 1000 * 60;
let timerId;

const createTimeLine = (offsetTop) => {
  const timeLine = document.createElement('div');
  timeLine.classList.add('time-line');
  timeLine.style.top = offsetTop + "px";
  return timeLine;
}

const removeTimerForTimeLine = () => {
  const timeLine = document.querySelector('.time-line');
  timeLine?.remove();
  clearInterval(timerId);
}

export const renderTimeLine = () => {
  removeTimerForTimeLine();

  const { minutes, seconds, hours, day } = getDateObj(new Date());
  const delayForNextRender = minute - (seconds * 1000);
  
  const calendarTimeSlot = document.querySelector(
    `[data-day="${day}"] [data-time="${hours}"]`
  );

  const timeLine = createTimeLine(minutes);
  calendarTimeSlot && calendarTimeSlot.append(timeLine);
  
  timerId = setInterval(renderTimeLine, delayForNextRender);
};