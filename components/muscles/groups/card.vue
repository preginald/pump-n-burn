<template>
  <div class="card-container" @click="expand(muscleGroup)">
    <div class="flex justify-between">
      <div>
        <h6>{{ muscleGroup.name }}</h6>
      </div>
      <div>
        <span class="badge-default">
          {{
            globalFunctions.convertDateToDaysAgo(muscleGroup.mostRecentSetStart)
          }}
        </span>
      </div>
    </div>
    <span v-for="exercise in muscleGroup.exercises" class="badge-dark">
      {{ exercise.exercise.name }}
    </span>
    <div v-if="muscleGroup.expand" class="mt-2">
      <h6>Related Muscles</h6>
      <ul>
        <li v-for="muscle in muscleGroup.muscles">
          {{ muscle.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { muscleGroup } = defineProps(["muscleGroup"]);
const expand = (muscleGroup: any) => {
  muscleGroup.expand = !muscleGroup.expand;
};
</script>
