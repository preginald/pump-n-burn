<template>
  <div class="card-container mt-2">
    <div class="flex justify-center">
      <p class="text-6xl text-gray-900 dark:text-white">
        {{ setStore.rest.duration }}
      </p>
    </div>
  </div>
  <!-- <div>
    <button @click="setStore.start()">Start</button>
    <button @click="reset()">Reset</button>
  </div> -->
  <!-- <pre>{{ setStore.rest }}</pre> -->
</template>

<script setup lang="ts">
import { useSetStore } from "@/stores/SetStore";
const setStore = useSetStore();

// function start() {
//   if (setStore.rest.running) return;

//   if (setStore.rest.timeBegan === null) {
//     reset();
//     setStore.rest.timeBegan = new Date();
//     setStore.rest.duration = new Date().toISOString();
//   }

//   if (setStore.rest.timeStopped !== null) {
//     setStore.rest.stoppedDuration += new Date() - timeStopped.value;
//   }

//   setStore.rest.started = setInterval(clockRunning, 10);
//   setStore.rest.running = true;
// }

// function stop() {
//   setStore.rest.running = false;
//   setStore.rest.timeStopped = new Date();
//   clearInterval(setStore.rest.started);
// }

function reset() {
  setStore.rest.running = false;
  clearInterval(setStore.rest.started);
  setStore.rest.stoppedDuration = 0;
  setStore.rest.timeBegan = null;
  setStore.rest.timeStopped = null;
  setStore.rest.duration = "00:00:00.000";
}

// function clockRunning() {
//   var currentTime: any = ref(new Date()),
//     timeElapsed = new Date(
//       currentTime.value -
//         setStore.rest.timeBegan -
//         setStore.rest.stoppedDuration
//     ),
//     hour = timeElapsed.getUTCHours(),
//     min = timeElapsed.getUTCMinutes(),
//     sec = timeElapsed.getUTCSeconds(),
//     ms = timeElapsed.getUTCMilliseconds();

//   setStore.rest.duration =
//     zeroPrefix(hour, 2) +
//     ":" +
//     zeroPrefix(min, 2) +
//     ":" +
//     zeroPrefix(sec, 2) +
//     "." +
//     zeroPrefix(ms, 3);
// }

// function zeroPrefix(num: number, digit: number) {
//   var zero = "";
//   for (var i = 0; i < digit; i++) {
//     zero += "0";
//   }
//   return (zero + num).slice(-digit);
// }
// start();
</script>
