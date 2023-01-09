<template>
  <div>
    <div>
      <div class="grid gap-6 mb-6 grid-cols-1">
        <div>
          <input type="text" v-model="muscle.name" placeholder="Name" />
        </div>
        <div>
          <select v-model="muscle.MuscleGroups.id">
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
        <button @click="submitForm" class="btn-green-lg">Save</button>
        <button @click="muscle.expand = false" class="btn-red-lg">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMuscleStore } from "@/stores/MuscleStore";
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
const { muscle } = defineProps(["muscle"]);
const muscleStore = useMuscleStore();
const muscleGroupStore = useMuscleGroupStore();

async function submitForm() {
  const formData = {
    name: muscleStore.muscle.name,
    muscleGroupsId: muscleStore.muscle.muscleGroupsId,
  };

  await $fetch("/api/muscles/" + muscleStore.muscle.id, {
    method: "PUT",
    body: formData,
  }).then(async () => {
    muscleStore.form = false;
    await muscleStore.readMuscles();
    await muscleGroupStore.readMuscleGroups();
  });
}
</script>
