import { reactive, toRefs } from 'vue';

const state = reactive({
  theme: 'light',
  radius: [0],
});

export function useCustomization() {
  function loadSavedCustomizations() {
    const savedTheme = localStorage.getItem('theme');
    const savedRadius = localStorage.getItem('radius');

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedRadius) {
      setRadius(savedRadius);
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

  function setRadius(newRadius) {
    state.radius = [+newRadius];
    document.documentElement.style.setProperty('--radius', `${newRadius}rem`);
    localStorage.setItem('radius', newRadius);
  }

  return {
    ...toRefs(state),
    loadSavedCustomizations,
    toggleTheme,
    setRadius,
  };
}
