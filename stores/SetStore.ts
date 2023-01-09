import { defineStore } from "pinia";

export const useSetStore = defineStore("SetStore", {
  state: () => {
    return {
      sets: ref([]),
      set: ref({
        start: "",
        finish: "",
        session_id: "",
        exercise_id: "",
        weight: "",
        unit: "",
        reps_r: "",
        reps_l: "",
        type: "",
        duration: "",
        rest: "",
      }),
      duration: "00:00:00.000",
      form: ref(false),
      rest: ref({
        form: ref(false),
        timeBegan: ref(null),
        timeStopped: ref(),
        stoppedDuration: ref(),
        started: ref(),
        running: ref(false),
        duration: "00:00:00.000",
      }),
    };
  },

  actions: {
    async readSetsBySessionId(session_id: string) {
      const { data } = await useFetch("/api/sets/session/" + session_id);
      this.sets = data;
    },
    async readSet(id: string) {
      const { data } = await useFetch("/api/sets/" + id);
      this.set = data;
    },
    toggleForm(state: boolean) {
      this.form = state;
    },
    toggleRest(state: boolean) {
      this.rest.form = state;
    },
    lastSet(): any {
      this.sets.sort((a, b) => new Date(b.start) - new Date(a.start));
    },
    resetDuration(): any {
      this.duration = "00:00:00.000";
    },
    start() {
      if (this.rest.running) return;

      if (this.rest.timeBegan === null) {
        this.reset();
        this.rest.timeBegan = new Date();
        this.rest.duration = new Date().toISOString();
      }

      if (this.rest.timeStopped !== null) {
        this.rest.stoppedDuration += new Date() - this.rest.timeStopped;
      }

      this.rest.started = setInterval(this.clockRunning, 10);
      this.rest.running = true;
    },
    clockRunning() {
      var currentTime: any = ref(new Date()),
        timeElapsed = new Date(
          currentTime.value - this.rest.timeBegan - this.rest.stoppedDuration
        ),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = timeElapsed.getUTCMilliseconds();

      this.rest.duration =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2) +
        "." +
        this.zeroPrefix(ms, 3);
    },
    stop() {
      this.rest.running = false;
      this.rest.timeStopped = new Date();
      clearInterval(this.rest.started);
    },
    zeroPrefix(num: number, digit: number) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    reset() {
      this.rest.running = false;
      clearInterval(this.rest.started);
      this.rest.stoppedDuration = 0;
      this.rest.timeBegan = null;
      this.rest.timeStopped = null;
      this.rest.duration = "00:00:00.000";
    },
  },

  // getters
});
