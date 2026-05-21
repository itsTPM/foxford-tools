// ToDo: this composable is used only for light/dark theme currently
// Maybe rename to useTheme and change state from object to plain string?
import { ref, toRefs, watch } from 'vue';

type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const state = ref<State>({
  theme: 'light',
});

function loadCustomization() {
  const theme = localStorage.getItem('theme') as Theme | null;

  state.value.theme = theme ?? getSystemTheme();
}

function saveCustomization() {
  localStorage.setItem('theme', state.value.theme);
}

function applyCustomization() {
  document.documentElement.classList.toggle('dark', state.value.theme === 'dark');
}

loadCustomization();

watch(
  state,
  () => {
    applyCustomization();
    saveCustomization();
  },
  { deep: true, immediate: true }
);

export function useCustomization() {
  function toggleTheme() {
    const currentTheme = state.value.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    state.value.theme = newTheme;
  }

  return {
    ...toRefs(state.value),
    toggleTheme,
  };
}
