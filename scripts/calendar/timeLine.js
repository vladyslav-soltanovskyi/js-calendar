export const createTimeLine = (offsetTop) => {
  const timeLine = document.createElement('div');
  timeLine.classList.add('time-line');
  timeLine.style.top = offsetTop + "px";
  return timeLine;
}

export const renderTimeLine = () => {
  const currentDate = new Date();
  
  const calendarTimeSlot = document.querySelector(
    `[data-day="${currentDate.getDate()}"] [data-time="${currentDate.getHours()}"]`
  );

  const timeLine = createTimeLine(currentDate.getMinutes());
  calendarTimeSlot && calendarTimeSlot.append(timeLine);
};