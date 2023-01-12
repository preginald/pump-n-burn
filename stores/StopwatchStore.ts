import { defineStore } from "pinia";

export const useStopwatchStore = defineStore("StopwatchStore", {
  state: () => {
    return {
      timeBegan: ref(null),
      timeStopped: ref(),
      stoppedDuration: ref(),
      started: ref(),
      running: ref(false),
    };
  },

  actions: {},

  // getters
});
