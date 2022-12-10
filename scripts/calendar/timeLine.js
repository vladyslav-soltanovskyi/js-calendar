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
  const currentDate = new Date();
  const delayForNextRender = minute - (currentDate.getSeconds() * 1000);
  
  const calendarTimeSlot = document.querySelector(
    `[data-day="${currentDate.getDate()}"] [data-time="${currentDate.getHours()}"]`
  );

  const timeLine = createTimeLine(currentDate.getMinutes());
  calendarTimeSlot && calendarTimeSlot.append(timeLine);
  
  timerId = setInterval(renderTimeLine, delayForNextRender);
};