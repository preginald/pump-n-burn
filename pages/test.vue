<template>
  <!-- <div
    v-for="exercise in processExercises(exerciseStore.exercises)"
    class="mb-3"
  >
    {{ exercise.name }}
    {{ globalFunctions.convertDateToDaysAgo(exercise.mostRecentSetStart) }}
    {{ exercise.volume }}
    <div v-for="set in exercise.sets">
      {{ globalFunctions.convertDateToDaysAgo(set.start) }} {{ set.type }}
      {{ set.weight }}
      {{ set.id }}
    </div>
  </div> -->
  <div>
    <pre>{{ processExercises(exerciseStore.exercises) }}</pre>
    <!-- <pre>{{ exerciseStore.exercises }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { useExerciseStore } from "@/stores/ExerciseStore";
const exerciseStore = useExerciseStore();
await exerciseStore.readExercises();

const processExercises = (exercises: any[]) => {
  exercises.forEach((exercise) => {
    exercise.volume = [];
    exercise.sets.forEach((set) => {
      if (set.type === "Heavy") {
        let sessionExists = false;
        exercise.volume.forEach((session) => {
          if (session.session_id === set.session_id) {
            session.weight.push(set.weight);
            session.reps.push(set.reps_r);
            sessionExists = true;
          }
        });
        if (!sessionExists) {
          exercise.volume.push({
            session_id: set.session_id,
            weight: [set.weight],
            reps: [set.reps_r],
          });
        }
      }
    });
  });
  return exercises;
};
</script>
