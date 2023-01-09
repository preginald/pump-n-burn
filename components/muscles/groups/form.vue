<template>
  <div>
    <div class="grid gap-6 mb-6 grid-cols-1">
      <div>
        <input
          type="text"
          v-model="muscleGroupStore.muscleGroup.name"
          placeholder="Name"
        />
      </div>
    </div>
    <div class="grid gap-6 mb-6 grid-cols-2">
      <button @click="muscleGroupStore.form = false" class="btn-default-lg">
        Cancel
      </button>
      <button @click="submitForm" class="btn-green-lg">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
const muscleGroupStore = useMuscleGroupStore();

async function submitForm() {
  const formData = {
    name: muscleGroupStore.muscleGroup.name,
  };

  await $fetch("/api/muscle-groups/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    await muscleGroupStore.readMuscleGroups();
    muscleGroupStore.resetMuscleGroup();
  });
}
</script>
