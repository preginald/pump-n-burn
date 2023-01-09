<template>
  <div>
    <div>
      <div class="grid gap-6 mb-6 grid-cols-2">
        <div>
          <input type="text" v-model="exercise.name" placeholder="Name" />
        </div>
        <div>
          <select v-model="exercise.type" placeholder="Type">
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
              exercise.mechanics == 'Compound'
                ? 'btn-group-active-left'
                : 'btn-group-left'
            "
            @click="exercise.mechanics = 'Compound'"
          >
            Compound
          </button>
          <button
            type="button"
            :class="
              exercise.mechanics == 'Isolation'
                ? 'btn-group-active-right'
                : 'btn-group-right'
            "
            @click="exercise.mechanics = 'Isolation'"
          >
            Isolation
          </button>
        </div>
        <div class="inline-flex rounded-md" role="group">
          <button
            type="button"
            :class="
              exercise.force == 'Push'
                ? 'btn-group-active-left'
                : 'btn-group-left'
            "
            @click="exercise.force = 'Push'"
          >
            Push
          </button>
          <button
            type="button"
            :class="
              exercise.force == 'Pull'
                ? 'btn-group-active-right'
                : 'btn-group-right'
            "
            @click="exercise.force = 'Pull'"
          >
            Pull
          </button>
        </div>
        <div class="inline-flex rounded-md" role="group">
          <button
            type="button"
            :class="
              exercise.lateral == 'Bi'
                ? 'btn-group-active-left'
                : 'btn-group-left'
            "
            @click="exercise.lateral = 'Bi'"
          >
            Bi
          </button>
          <button
            type="button"
            :class="
              exercise.lateral == 'Uni'
                ? 'btn-group-active-right'
                : 'btn-group-right'
            "
            @click="exercise.lateral = 'Uni'"
          >
            Uni
          </button>
        </div>
        <div>
          <select v-model="exercise.agonists" multiple>
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
        <button @click="exercise.expand = false" class="btn-red-lg">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExerciseStore } from "@/stores/ExerciseStore";
import { useMuscleGroupStore } from "@/stores/MuscleGroupStore";
const { exercise } = defineProps(["exercise"]);
const exerciseStore = useExerciseStore();
const muscleGroup = useMuscleGroupStore();
const exerciseTypes = [
  "Barbell",
  "Body",
  "Dumbell",
  "Machine",
  "Plate",
  "Cable",
];

async function submitForm() {
  const formData = {
    name: exercise.name,
    type: exercise.type,
    mechanics: exercise.mechanics,
    force: exercise.force,
    lateral: exercise.lateral,
    agonists: exercise.agonists,
  };
  console.log(exercise.id);
  await $fetch("/api/exercises/put/" + exercise.id, {
    method: "PUT",
    body: formData,
  }).then(async () => {
    // exerciseStore.exercise.form = false;
    await exerciseStore.readExercises();
    // await muscleGroupStore.readMuscleGroups();
  });
}
</script>
