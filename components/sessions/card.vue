<template>
  <div class="card-container">
    <div class="flex justify-between">
      <h5>{{ prettyDateTime(session.start) }}</h5>
      <h5 v-if="session.finish !== null">
        {{ globalFunctions.diffBtwDt(session.start, session.finish) }}
      </h5>
      <div v-else>
        <span class="badge-green">In Progress</span>
      </div>
      <p class="text-sm">{{ session.gym.name }}</p>
    </div>
    <NuxtLink :to="`/sessions/${session.id}`">
      <p class="id">{{ session.id }}</p></NuxtLink
    >
  </div>
  <!-- <div>
    <label for="Start"></label>
    <input type="datetime" />
  </div> -->
  <!-- <pre>{{ session }}</pre> -->
</template>

<script setup lang="ts">
import globalfunctions from "@/utils/global-functions";
const { session } = defineProps(["session"]);

function prettyDateTime(datetimeString: any) {
  // Create a Date object from the datetime string
  const date = new Date(datetimeString);
  return date.toLocaleString();
}
</script>
