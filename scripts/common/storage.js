const storage = {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [],
}

export const setItem = (key, value) => {
  storage[key] = value;
};

export const getItem = (key) => {
  return storage[key];
};

const getEvents = () => getItem('events');

const getEvent = (eventId) => getItem('events').find(event => event.id === eventId);

const setEvents = (eventsList) => {
  setItem('events', eventsList);
}

const createEvent = (eventData) => {
  setItem('events', [...getItem('events'), eventData]);
}

const deleteEvent = (eventId) => {
  setItem('events', getItem('events').filter(event => event.id !== eventId));
}

const updateEvent = (eventId, eventData) => {
  setItem('events', getItem('events').map(event => event.id !== eventId ? event : { ...event, ...eventData }));
}

const getEventIdToDelete = () => getItem('eventIdToDelete');

const setEventIdToDelete = (eventId) => {
  setItem('eventIdToDelete', eventId);
}

const getDisplayedWeekStart = () => getItem('displayedWeekStart');

const setDisplayedWeekStart = (date) => {
  setItem('displayedWeekStart', date);
}

export default {
  getEvents,
  getEvent,
  setEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventIdToDelete,
  setEventIdToDelete,
  getDisplayedWeekStart,
  setDisplayedWeekStart
}