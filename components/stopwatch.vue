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
import { useStopwatchStore } from "@/stores/StopwatchStore";
const setStore = useSetStore();
const stopwatchStore = useStopwatchStore();

let startBtnState = ref("Start");

function start() {
  if (stopwatchStore.running) return;

  if (stopwatchStore.timeBegan === null) {
    reset();
    stopwatchStore.timeBegan = new Date();
    setStore.duration = new Date().toISOString();
  }

  if (stopwatchStore.timeStopped !== null) {
    stopwatchStore.stoppedDuration += new Date() - stopwatchStore.timeStopped;
  }

  stopwatchStore.started = setInterval(clockRunning, 10);
  stopwatchStore.running = true;
}

// function stop() {
//   stopwatchStore.running = false;
//   stopwatchStore.timeStopped = new Date();
//   clearInterval(stopwatchStore.started);
// }

function reset() {
  stopwatchStore.running = false;
  clearInterval(stopwatchStore.started);
  stopwatchStore.stoppedDuration = 0;
  stopwatchStore.timeBegan = null;
  stopwatchStore.timeStopped = null;
  setStore.duration = "00:00:00.000";
  startBtnState.value = "Start";
}

const setState = () => {
  if (startBtnState.value == "Start") {
    setStore.toggleRest(false);
    setStore.set.rest = setStore.rest.duration;
    (setStore.set.rest = parseInt(setStore.set.rest)), setStore.stop();
    start();
    startBtnState.value = "Pause";
  } else {
    // stop();
    stopwatchStore.stop();
    startBtnState.value = "Start";
  }
};

function clockRunning() {
  var currentTime: any = ref(new Date());
  var timeElapsed = new Date(
    currentTime.value -
      stopwatchStore.timeBegan -
      stopwatchStore.stoppedDuration
  );
  var hour = timeElapsed.getUTCHours();
  var min = timeElapsed.getUTCMinutes();
  var sec = timeElapsed.getUTCSeconds();
  var ms = timeElapsed.getUTCMilliseconds();

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
