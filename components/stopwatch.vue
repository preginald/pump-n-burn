<template>
  <div class="grid gap-6 mb-6 grid-cols-1">
    <div>
      <p class="text-6xl text-gray-900 dark:text-white">
        {{ setStore.duration }}
      </p>
    </div>
  </div>

  <div class="grid gap-6 mb-6 grid-cols-2">
    <button type="button" class="btn-default-lg" @click="reset()">Reset</button>
    <button type="button" class="btn-yellow-lg" @click="setState()">
      {{ startBtnState }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSetStore } from "@/stores/SetStore";
const setStore = useSetStore();

let startBtnState = ref("Start");

var timeBegan: any = ref(null),
  timeStopped = ref(),
  stoppedDuration: any = ref(),
  started = ref(),
  running = ref(false);

function start() {
  if (running.value) return;

  if (timeBegan.value === null) {
    reset();
    timeBegan.value = new Date();
    // setStore.start = new Date().toISOString();
    setStore.duration = new Date().toISOString();
  }

  if (timeStopped.value !== null) {
    stoppedDuration.value += new Date() - timeStopped.value;
  }

  started.value = setInterval(clockRunning, 10);
  running.value = true;
}

function stop() {
  running.value = false;
  timeStopped.value = new Date();
  clearInterval(started.value);
}

function reset() {
  running.value = false;
  clearInterval(started.value);
  stoppedDuration.value = 0;
  timeBegan.value = null;
  timeStopped.value = null;
  setStore.duration = "00:00:00.000";
  startBtnState.value = "Start";
}

const setState = () => {
  if (startBtnState.value == "Start") {
    // setStore.toggleRest(false);
    // setStore.set.rest = setStore.rest.duration;
    // setStore.set.rest = parseInt(setStore.set.rest),
    setStore.stop();
    start();
    startBtnState.value = "Pause";
  } else {
    stop();
    startBtnState.value = "Start";
  }
};

function clockRunning() {
  var currentTime: any = ref(new Date()),
    timeElapsed = new Date(
      currentTime.value - timeBegan.value - stoppedDuration.value
    ),
    hour = timeElapsed.getUTCHours(),
    min = timeElapsed.getUTCMinutes(),
    sec = timeElapsed.getUTCSeconds(),
    ms = timeElapsed.getUTCMilliseconds();

  setStore.duration =
    zeroPrefix(hour, 2) +
    ":" +
    zeroPrefix(min, 2) +
    ":" +
    zeroPrefix(sec, 2) +
    "." +
    zeroPrefix(ms, 3);
}

function zeroPrefix(num: number, digit: number) {
  var zero = "";
  for (var i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
}
</script>
