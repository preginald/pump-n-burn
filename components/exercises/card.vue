<template>
  <div
    @mouseover="exercise.hover = true"
    @mouseleave="exercise.hover = false"
    class="card-container"
  >
    <div class="flex justify-between">
      <div>
        <h6>{{ exercise.name }}</h6>
      </div>
      <div>
        <span class="badge-default">
          {{
            globalFunctions.convertDateToDaysAgo(exercise.mostRecentSetStart)
          }}
        </span>
      </div>
    </div>
    <div>
      <span class="badge-default">{{ exercise.type }}</span>
      <span v-for="agonist in exercise.agonists" class="badge-red self-end">
        {{ agonist.agonist.name }}
      </span>
    </div>
    <div class="flex justify-between">
      <div v-if="exercise.hover" class="flex justify-end">
        <span class="badge-dark">{{ exercise.mechanics }}</span>
        <span class="badge-dark">{{ exercise.lateral }}</span>
        <span class="badge-dark">{{ exercise.force }}</span>
      </div>
      <!-- <p class="id">{{ exercise.id }}</p> -->
      <span
        v-if="!exercise.expand && exercise.hover"
        @click="editExercise(exercise)"
        class="btn-txt"
      >
        Edit
      </span>
    </div>
    <ExercisesEditForm
      v-if="exercise.expand"
      :exercise="exercise"
      class="mt-5"
    />
  </div>
</template>

<script setup lang="ts">
import { useExerciseStore } from "@/stores/ExerciseStore";
const exerciseStore = useExerciseStore();
const { exercise } = defineProps(["exercise"]);
const editExercise = (exercise: any) => {
  exercise.expand = true;
  // exercise.expand = !exercise.expand;
  // exerciseStore.exercise = exercise;
  // console.log(exercise);
};
</script>

<style scoped></style>
