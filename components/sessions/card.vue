<template>
  <NuxtLink :to="`/sessions/${session.id}`">
    <div class="card-container">
      <div class="flex justify-between">
        <div>
          <h5>{{ globalFunctions.prettyDateTime(session.start) }}</h5>
          <h5 v-if="session.finish !== null"></h5>
        </div>
        <div>
          <span class="badge-default">{{ session.gym.name }}</span>
        </div>
        <div v-if="session.finish === null">
          <span class="badge-green">In Progress</span>
        </div>
        <div v-else>
          <span class="badge-dark">
            {{ globalFunctions.diffBtwDt(session.start, session.finish) }}
          </span>
        </div>
      </div>
      <div class="flex">
        <div>
          <span v-for="exercise in exercises(session)" class="badge-dark">{{
            exercise.name
          }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { session } = defineProps(["session"]);
const exercises = (session: any) => {
  const exercises = session.sets
    .map((set) => set.exercise)
    .filter(
      (exercise, index, self) =>
        self.findIndex((t) => t.id === exercise.id) === index
    );
  return exercises;
};
</script>
