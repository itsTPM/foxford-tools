import { defineStore } from 'pinia';

export const useNeedRefreshStore = defineStore('needRefresh', {
  state: () => ({
    needRefresh: false,
  }),
  actions: {
    setNeedRefresh(value) {
      this.needRefresh = value;
    },
  },
});
