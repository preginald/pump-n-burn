<template>
  <div>
    <h2>Muscle Groups</h2>
    <div class="card-container my-3">
      <div class="grid grid-cols-1">
        <MusclesGroupsForm v-if="muscleGroupStore.form" />
        <div v-else>
          <button @click="muscleGroupStore.form = true" class="btn-green-lg">
            Add Muscle Group
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-for="muscleGroup in muscleGroupStore.muscleGroups">
    <!-- <pre>{{ muscleGroup }}</pre> -->
    <MusclesGroupsCard :muscleGroup="muscleGroup" />
  </div>
  <div>
    <h2>Muscles</h2>
    <div class="card-container my-3">
      <div class="grid grid-cols-1">
        <MusclesForm v-if="muscleStore.form" />
        <div v-else>
          <button @click="muscleStore.form = true" class="btn-green-lg">
            Add Muscle
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-for="muscle in useMuscleStore().muscles">
    <MusclesCard :muscle="muscle" />
  </div>
</template>

<script setup lang="ts">
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
import { useMuscleStore } from "@/stores/MuscleStore";
import { useSetStore } from "@/stores/SetStore";

const muscleGroupStore = useMuscleGroupStore();
const muscleStore = useMuscleStore();
const setStore = useSetStore();

const muscleGroups = muscleGroupStore.muscleGroups;

await setStore.readSets();
await muscleGroupStore.readMuscleGroups();
await muscleStore.readMuscles();
</script>
