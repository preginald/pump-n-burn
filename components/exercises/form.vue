<template>
  <div>
    <div>
      <div class="grid gap-6 mb-6 grid-cols-2">
        <div>
          <input
            type="text"
            v-model="exerciseStore.exercise.name"
            placeholder="Name"
          />
        </div>
        <div>
          <select v-model="exerciseStore.exercise.type" placeholder="Type">
            <option value="" disabled selected hidden>Exercise Type</option>

            <option v-for="exerciseType in exerciseTypes">
              {{ exerciseType }}
            </option>
          </select>
        </div>

        <div class="inline-flex rounded-md" role="group">
          <button
            type="button"
            :class="
              exerciseStore.exercise.mechanics == 'Compound'
                ? 'btn-group-active-left'
                : 'btn-group-left'
            "
            @click="exerciseStore.exercise.mechanics = 'Compound'"
          >
            Compound
          </button>
          <button
            type="button"
            :class="
              exerciseStore.exercise.mechanics == 'Isolation'
                ? 'btn-group-active-right'
                : 'btn-group-right'
            "
            @click="exerciseStore.exercise.mechanics = 'Isolation'"
          >
            Isolation
          </button>
        </div>
        <div class="inline-flex rounded-md" role="group">
          <button
            type="button"
            :class="
              exerciseStore.exercise.force == 'Push'
                ? 'btn-group-active-left'
                : 'btn-group-left'
            "
            @click="exerciseStore.exercise.force = 'Push'"
          >
            Push
          </button>
          <button
            type="button"
            :class="
              exerciseStore.exercise.force == 'Pull'
                ? 'btn-group-active-right'
                : 'btn-group-right'
            "
            @click="exerciseStore.exercise.force = 'Pull'"
          >
            Pull
          </button>
        </div>
        <div class="inline-flex rounded-md" role="group">
          <button
            type="button"
            :class="
              exerciseStore.exercise.lateral == 'Bi'
                ? 'btn-group-active-left'
                : 'btn-group-left'
            "
            @click="exerciseStore.exercise.lateral = 'Bi'"
          >
            Bi
          </button>
          <button
            type="button"
            :class="
              exerciseStore.exercise.lateral == 'Uni'
                ? 'btn-group-active-right'
                : 'btn-group-right'
            "
            @click="exerciseStore.exercise.lateral = 'Uni'"
          >
            Uni
          </button>
        </div>
        <div>
          <select v-model="exerciseStore.exercise.agonists" multiple>
            <option
              v-for="agonist in muscleGroup.muscleGroups"
              :value="agonist.id"
            >
              {{ agonist.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="grid gap-6 mb-6 grid-cols-2">
        <button @click="submitForm" class="btn-green-lg">Save</button>
        <button @click="exerciseStore.toggleForm(false)" class="btn-red-lg">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExerciseStore } from "@/stores/ExerciseStore";
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
const exerciseStore = useExerciseStore();
const muscleGroup = useMuscleGroupStore();
await exerciseStore.readExercises();
const exerciseTypes = [
  "Barbell",
  "Body",
  "Dumbell",
  "Machine",
  "Plate",
  "Cable",
];

const submitForm = async () => {
  console.log(exerciseStore.exercise);
  const formData = {
    name: exerciseStore.exercise.name,
    type: exerciseStore.exercise.type,
    mechanics: exerciseStore.exercise.mechanics,
    force: exerciseStore.exercise.force,
    lateral: exerciseStore.exercise.lateral,
    agonists: exerciseStore.exercise.agonists,
  };

  await $fetch("/api/exercises/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    await exerciseStore.readExercises();
    await muscleGroup.readMuscleGroups();
    exerciseStore.muscle = {};
  });
};
</script>
