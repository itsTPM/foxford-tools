import { reactive, toRefs } from 'vue';

const state = reactive({
  theme: 'light',
});

export function useCustomization() {
  function loadSavedCustomizations() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }

  function toggleTheme() {
    const currentTheme = state.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.classList.remove(currentTheme);
    setTheme(newTheme);
  }

  function setTheme(newTheme) {
    state.theme = newTheme;
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return {
    ...toRefs(state),
    loadSavedCustomizations,
    toggleTheme,
  };
}
