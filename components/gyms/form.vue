<template>
  <div>
    <div v-if="gymStore.form">
      <div class="grid gap-6 mb-6 grid-cols-1">
        <div>
          <input type="text" v-model="gymStore.gym.name" placeholder="Name" />
        </div>
        <div>
          <input
            type="text"
            v-model="gymStore.gym.address"
            placeholder="Address"
          />
        </div>
      </div>
      <div class="grid gap-6 mb-6 grid-cols-2">
        <button @click="submitForm" class="btn-green-lg">Save</button>
        <button @click="gymStore.form = false" class="btn-red-lg">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGymStore } from "@/stores/GymStore";
const gymStore = useGymStore();

async function submitForm() {
  const formData = {
    name: gymStore.gym.name,
    address: gymStore.gym.address,
  };
  await $fetch("/api/gyms/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    await gymStore.readGyms();
    gymStore.muscle = {};
  });
}
</script>
