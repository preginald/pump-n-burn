<template>
  <!-- <div v-for="set in setStore.sets">
    <pre>{{ set }}</pre>
  </div> -->
  <p>Most recent</p>
  <!-- <input type="text" v-model="muscleGroupId" />
  <button @click="runFilters(muscleGroupId)">Search</button>
  <pre>{{ set }}</pre> -->
  <div v-for="muscleGroup in muscleGroups">
    id: {{ muscleGroup.id }}
    <!-- {{ globalfunctions.convertDateToDaysAgo(muscleGroup.start) }} -->
    <pre>{{ filterSets(muscleGroup.id) }}</pre>
  </div>
  <!-- <p>All sets with muscleGroupId</p>
  <pre>{{ sets }}</pre> -->
</template>

<script setup lang="ts">
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
import { useSetStore } from "@/stores/SetStore";

const setStore = useSetStore();
const muscleGroupStore = useMuscleGroupStore();

await muscleGroupStore.readMuscleGroups();
await setStore.readSets();

const muscleGroupId = ref("");
const set = ref({});
const sets = ref([]);

const muscleGroups = muscleGroupStore.muscleGroups;

function runFilters(muscleGroupId) {
  filterSets(muscleGroupId);
  filterSetsByMuscleGroup(muscleGroupId);
}

function filterSetsByMuscleGroup(muscleGroupId: string): any[] {
  sets.value = setStore.sets.filter((set) =>
    set.exercise.agonists.find(
      (agonist) => agonist.muscleGroupId === muscleGroupId
    )
  );
  console.log(sets.value);
}

function filterSets(muscleGroupId: string) {
  // Sort sets by start time in descending order
  const sortedSets = setStore.sets.sort(
    (a, b) => new Date(b.start) - new Date(a.start)
  );
  // Filter sets by muscle group id
  const filteredSets = sortedSets.filter((set) => {
    return set.exercise.agonists.find(
      (agonist) => agonist.muscleGroupId === muscleGroupId
    );
  });
  // Return the most recent set
  const filteredSet = filteredSets[0];
  if (filteredSet !== undefined) {
    filteredSet.daysAgo = globalFunctions.convertDateToDaysAgo(
      filteredSet.start
    );
  }
  return filteredSet;
}
</script>
