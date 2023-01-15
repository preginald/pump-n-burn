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
    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      // setStore.duration = "00:00:00.000";
      // startBtnState.value = "Start";
    },
  },

  // getters
});
