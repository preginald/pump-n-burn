<template>
  <div class="card-container my-3">
    <div class="grid grid-cols-1">
      <ExercisesForm v-if="exerciseStore.form" />
      <div v-else>
        <button @click="exerciseStore.toggleForm(true)" class="btn-green-lg">
          Add Exercise
        </button>
      </div>
    </div>
  </div>
  <div v-for="exercise in exerciseStore.exercises">
    <ExercisesCard :exercise="exercise" />
  </div>
</template>

<script setup lang="ts">
import { useExerciseStore } from "@/stores/ExerciseStore";
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
const exerciseStore = useExerciseStore();
const muscleGroupStore = useMuscleGroupStore();
await exerciseStore.readExercises();
await muscleGroupStore.readMuscleGroups();
</script>
