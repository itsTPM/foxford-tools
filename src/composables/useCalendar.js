import { reactive, toRefs } from 'vue';

const state = reactive({
  calendarLink: null,
});

export function useCalendar() {
  async function getCalendarLink() {
    const response = await fetch('https://foxford.ru/api/calendar?date_from=2077-01-01&date_to=2077-01-01');

    if (!response.ok) {
      throw new Error('Failed to fetch calendar data');
    }

    const data = await response.json();
    const calendarLink = data.share_url;

    return calendarLink;
  }

  function setCalendarLink(newCalendarLink) {
    state.calendarLink = newCalendarLink;
    localStorage.setItem('calendarLink', newCalendarLink);
  }

  function loadSavedCalendarLink() {
    const savedCalendarLink = localStorage.getItem('calendarLink');
    if (savedCalendarLink) {
      state.calendarLink = savedCalendarLink;
    }
  }

  return {
    ...toRefs(state),
    getCalendarLink,
    setCalendarLink,
    loadSavedCalendarLink,
  };
}
