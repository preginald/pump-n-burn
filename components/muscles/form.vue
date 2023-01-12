<template>
  <div>
    <div v-if="muscleStore.form">
      <div class="grid gap-6 mb-6 grid-cols-1">
        <div>
          <input
            type="text"
            v-model="muscleStore.muscle.name"
            placeholder="Name"
          />
        </div>
        <div>
          <select v-model="muscleStore.muscle.muscleGroupsId">
            <option
              v-for="muscleGroup in muscleGroupStore.muscleGroups"
              :value="muscleGroup.id"
            >
              {{ muscleGroup.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="grid gap-6 mb-6 grid-cols-2">
        <button @click="muscleStore.form = false" class="btn-default-lg">
          Cancel
        </button>
        <button @click="submitForm" class="btn-green-lg">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMuscleStore } from "@/stores/MuscleStore";
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
const muscleStore = useMuscleStore();
const muscleGroupStore = useMuscleGroupStore();

async function submitForm() {
  const formData = {
    name: muscleStore.muscle.name,
    muscleGroupsId: muscleStore.muscle.muscleGroupsId,
  };
  await $fetch("/api/muscles/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    await muscleStore.readMuscles();
    await muscleGroupStore.readMuscleGroups();
    muscleStore.muscle = {};
  });
}
</script>
