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

  actions: {
    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
    },
  },

  // getters
});
