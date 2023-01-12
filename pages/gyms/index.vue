<template>
  <div class="card-container my-3">
    <div class="grid grid-cols-1">
      <GymsForm v-if="gymStore.form" />
      <div v-else>
        <button @click="gymStore.toggleForm(true)" class="btn-green-lg">
          Add Gym
        </button>
      </div>
    </div>
  </div>
  <div v-for="gym in gymStore.gyms">
    <GymsCard :gym="gym" />
  </div>
  <!-- <pre>{{ gymStore }}</pre> -->
</template>

<script setup lang="ts">
import { useGymStore } from "@/stores/GymStore";
const gymStore = useGymStore();

await gymStore.readGyms();

// function submit() {
//   if (gym.value.id == "") {
//     addGym();
//   } else {
//     editGym(gym.value.id);
//   }
// }

// async function addGym() {
//   const formData = {
//     name: gym.value.name,
//     address: gym.value.address,
//   };

//   await $fetch("/api/gyms/create", {
//     method: "POST",
//     body: formData,
//   }).then(async () => {
//     resetGym();
//     gyms = await getGyms();
//   });
// }

// async function editGym(id: string) {
//   const formData = {
//     name: gym.value.name,
//     address: gym.value.address,
//   };

//   await $fetch("/api/gyms/" + id, {
//     method: "PUT",
//     body: formData,
//   }).then(async () => {
//     resetGym();
//     gyms = await getGyms();
//   });
// }

// function resetGym() {
//   form.value = false;
//   gym.value = {
//     id: "",
//     name: "",
//     address: "",
//   };
// }

// async function deleteGym(id: string) {
//   await $fetch(`/api/gyms/${id}`, {
//     method: "DELETE",
//   }).then(async () => {
//     gyms = await getGyms();
//   });
// }

// async function getGym(id: string) {
//   await $fetch(`/api/gyms/${id}`, {
//     method: "GET",
//   }).then(async (data: any) => {
//     form.value = true;
//     gym.value.name = data.name;
//     gym.value.address = data.address;
//     gym.value.id = data.id;
//   });
// }
</script>
