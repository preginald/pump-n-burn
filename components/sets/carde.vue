<template>
  <div class="card-container">
    <div class="flex justify-between">
      <div class="mr-2 flex">
        <p class="xs">
          {{ new Date(set.start).toLocaleTimeString() }}
        </p>
      </div>
      <div class="mr-2 flex">
        <h6>
          <!-- {{ cardTitle(set) }} -->
        </h6>
        <!-- <h6 class="mr-1">{{ set.exercise.type }}</h6>
        <h6>{{ set.exercise.name }}</h6> -->
      </div>
      <div class="mr-2 flex">
        <p class="xs">
          {{ globalFunctions.millisecondsToDuration(set.duration) }}
        </p>
      </div>
    </div>
    <div class="flex justify-between">
      <div>
        <span :class="setTypeClass(set.type)">
          {{ set.type }}
        </span>
      </div>
      <div class="mr-2">
        <span class="badge-orange"> {{ set.weight * set.reps_r }}v</span>
        <!-- <span class="mr-1 text-xs">v</span> -->
        <span class="badge-orange">{{ set.weight }}{{ set.unit }}</span>
        <span class="badge-orange">x{{ set.reps_r }}</span>
        <!-- <span class="badge-orange" v-if="isUni(set.exercise)"
          >x{{ set.reps_l }}</span
        > -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { set } = defineProps(["set"]);

var isUni = (exercise: any) => {
  return exercise.lateral == "Uni" ? true : false;
};
// const cardTitle = (set: object) => {
//   // console.log(set);
//   return set.exercise.type + " " + set.exercise.name;
//   return "yo yo yo";
// };

var setTypeClass = (type: string) => {
  switch (type) {
    case "Warm":
      return "badge-warm";
      break;

    case "Heavy":
      return "badge-heavy";
      break;
  }
};
</script>
