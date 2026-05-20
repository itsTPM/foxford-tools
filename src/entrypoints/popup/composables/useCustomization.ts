// ToDo: this composable is used only for light/dark theme currently
// Maybe rename to useTheme and change state from object to plain string?
import { ref, toRefs, watch } from 'vue';

type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
}

const state = ref<State>({
  theme: 'light',
});

function loadCustomization() {
  const theme = localStorage.getItem('theme') as Theme | null;

  if (theme) {
    state.value.theme = theme;
  }
}

function saveCustomization() {
  localStorage.setItem('theme', state.value.theme);
}

function applyCustomization() {
  const newTheme = state.value.theme;
  const oldTheme = newTheme === 'light' ? 'dark' : 'light';

  document.documentElement.classList.remove(oldTheme);
  document.documentElement.classList.add(newTheme);
}

watch(
  state,
  () => {
    applyCustomization();
    saveCustomization();
  },
  { deep: true }
);

loadCustomization();

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
