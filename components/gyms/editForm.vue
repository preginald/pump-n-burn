<template>
  <div>
    <div>
      <div class="grid gap-6 mb-6 grid-cols-1">
        <div>
          <input type="text" v-model="gym.name" placeholder="Name" />
        </div>
        <div>
          <input type="text" v-model="gym.address" placeholder="Address" />
        </div>
        <div></div>
      </div>
      <div class="grid gap-6 mb-6 grid-cols-2">
        <button @click="submitForm" class="btn-green-lg">Save</button>
        <button @click="gym.expand = false" class="btn-red-lg">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGymStore } from "@/stores/GymStore";
const { gym } = defineProps(["gym"]);
const gymStore = useGymStore();

async function submitForm() {
  const formData = {
    name: gymStore.gym.name,
    address: gymStore.gym.address,
  };

  await $fetch("/api/gyms/" + gymStore.gym.id, {
    method: "PUT",
    body: formData,
  }).then(async () => {
    gymStore.form = false;
    await gymStore.readGyms();
  });
}
</script>
