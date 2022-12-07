const baseUrl = 'https://61d8e2cfe6744d0017ba8cdc.mockapi.io/events';

const request = async (url, { method = 'GET', body = {}, ...rest }) => {
  try {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      ...rest.headers
    };
  
    const options = (method === 'GET')
      ? { method, ...rest, headers }
      : { method, body: JSON.stringify(body), ...rest, headers };

    const res = await fetch(`${baseUrl}${url}`, options);

    if (!res.ok) {
      throw new Error('Server Error');
    }

    return (await res.json());
  } catch (err) {
    alert('Internal Server Error');
  }
}

const getEvents = () => request('', { method: "GET" });

const createEvent = (eventData) => request('', { method: "POST", body: eventData });

const deleteEvent = (eventId) => request(`/${eventId}`, { method: "DELETE" });

const updateEvent = (eventId, eventData) => request(`/${eventId}`, { method: "PUT", body: eventData });

export default {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent
}
