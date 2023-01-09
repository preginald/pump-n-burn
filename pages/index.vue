<template>
  <ul>
    <li v-for="gym in gyms" :key="gym.id">{{ gym.name }} {{ gym.address }}</li>
  </ul>
  <NuxtLink to="/gym">Gyms</NuxtLink>
</template>

<script setup>
const { data: gyms } = await useFetch("/api/gyms");
</script>
