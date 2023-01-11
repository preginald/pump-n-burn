<template>
  <NuxtLink :to="`/sessions/${session.id}`">
    <div class="card-container">
      <div class="flex justify-between">
        <h5>{{ prettyDateTime(session.start) }}</h5>
        <h5 v-if="session.finish !== null"></h5>
      </div>
      <div class="flex justify-between">
        <div v-if="session.finish === null">
          <span class="badge-green">In Progress</span>
        </div>
        <div v-else>
          <span class="badge-dark">
            {{ globalFunctions.diffBtwDt(session.start, session.finish) }}
          </span>
        </div>
        <div>
          <p class="badge-default">{{ session.gym.name }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
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
