<template>
  <div>
    <div class="grid gap-6 mb-6 grid-cols-2">
      <div>
        <select
          name="exercise"
          v-model="setStore.set.exercise_id"
          @change="exerciseStore.readExercise"
        >
          <option value="">Select an exercise</option>
          <option
            v-for="exercise in exerciseStore.exercises"
            :value="exercise.id"
          >
            {{ exercise.name }}
          </option>
        </select>
      </div>

      <div class="inline-flex rounded-md" role="group">
        <button
          type="button"
          :class="
            setStore.set.type == 'Warm'
              ? 'btn-group-active-left'
              : 'btn-group-left'
          "
          @click="setStore.set.type = 'Warm'"
        >
          Warm
        </button>
        <button
          type="button"
          :class="
            setStore.set.type == 'Heavy'
              ? 'btn-group-active-right'
              : 'btn-group-right'
          "
          @click="setStore.set.type = 'Heavy'"
        >
          Heavy
        </button>
      </div>

      <div>
        <!-- <label
            for="weight"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Weight</label
          > -->
        <input
          v-model="setStore.set.weight"
          type="number"
          id="weight"
          class=""
          placeholder="Weight"
          required
        />
      </div>
      <div class="inline-flex rounded-md" role="group">
        <button
          type="button"
          :class="
            setStore.set.unit == 'KG'
              ? 'btn-group-active-left'
              : 'btn-group-left'
          "
          @click="setStore.set.unit = 'KG'"
        >
          KG
        </button>
        <button
          type="button"
          :class="
            setStore.set.unit == 'LB'
              ? 'btn-group-active-right'
              : 'btn-group-right'
          "
          @click="setStore.set.unit = 'LB'"
        >
          LB
        </button>
      </div>
      <div v-if="unilateral()">
        <label
          for="reps_l"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Reps L</label
        >
        <input
          v-model="setStore.set.reps_l"
          type="number"
          id="reps_l"
          class=""
          placeholder="Reps Left"
          required
        />
      </div>
    </div>
    <stopwatch v-if="isValidated()" />
    <div v-if="isValidated()" class="grid gap-6 mb-6 grid-cols-2">
      <div>
        <label
          for="reps_r"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Reps R</label
        >
        <input
          @click="stopwatchStore.stop()"
          v-model="setStore.set.reps_r"
          type="number"
          id="reps_r"
          class=""
          placeholder="Reps Right"
          required
        />
      </div>
    </div>
  </div>
  <div v-if="setStore.form && isValidated()">
    <div class="grid gap-6 mb-6 grid-cols-2">
      <button @click="setStore.toggleForm(false)" class="btn-default-lg">
        Cancel
      </button>
      <button
        @click="submitForm"
        class="btn-green-lg"
        :disabled="submitDisabled()"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExerciseStore } from "@/stores/ExerciseStore";
import { useSessionStore } from "@/stores/SessionStore";
import { useSetStore } from "@/stores/SetStore";
import { useStopwatchStore } from "@/stores/StopwatchStore";
const exerciseStore = useExerciseStore();
const sessionStore = useSessionStore();
const setStore = useSetStore();
const stopwatchStore = useStopwatchStore();

const id: string | string[] = useRoute().params.id;
await exerciseStore.readExercises();
// await sessionStore.readSession(id);
// await setStore.readSets();

let setTypeSwitch = ref(false);

const setUnitBtnLeft = () => {
  setStore.set.type = setTypeSwitch.value ? "Warm" : "Heavy";
};

const setUnitBtnRight = () => {
  setStore.set.type = setTypeSwitch.value ? "Warm" : "Heavy";
};

const setBtnLeft = () => {
  return setStore.set.unit == "KG"
    ? "btn-group-active-right"
    : "btn-group-right";
};

const setBtnRight = () => {
  return setStore.set.unit == "LB"
    ? "btn-group-active-right"
    : "btn-group-right";
};

function unilateral() {
  return exerciseStore.exercise.lateral == "Uni" ? true : false;
}

async function submitForm() {
  setStore.set.duration = globalFunctions
    .durationToMilliseconds(setStore.duration)
    .toString();

  setStore.set.rest = globalFunctions
    .durationToMilliseconds(setStore.rest.duration)
    .toString();

  setStore.set.finish = new Date().toISOString();

  const formData = {
    start: setStore.set.start,
    finish: setStore.set.finish,
    session_id: sessionStore.session.id,
    exercise_id: setStore.set.exercise_id,
    weight: setStore.set.weight,
    unit: setStore.set.unit,
    reps_r: setStore.set.reps_r,
    reps_l:
      exerciseStore.exercise.lateral == "Uni" ? setStore.set.reps_l : null,
    type: setStore.set.type,
    duration: parseInt(setStore.set.duration),
    rest: parseInt(setStore.set.rest),
  };

  await $fetch("/api/sets/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    setStore.readSetsBySessionId(id);
    setStore.toggleForm(false); //
    setStore.toggleRest(true); //
    setStore.reset();
    setStore.start();
    setStore.resetDuration();
    stopwatchStore.reset();
  });
}

const isValidated = (): boolean => {
  const set = setStore.set;
  if (
    set.exercise_id === "" ||
    set.type === "" ||
    set.unit === "" ||
    set.weight === ""
  ) {
    return false;
  } else {
    return true;
  }
};

const submitDisabled = (): boolean => {
  const set = setStore.set;

  if (unilateral()) {
    if (set.reps_l === "" || set.reps_r === "") {
      return true;
    } else {
      return false;
    }
  } else {
    if (set.reps_r === "") {
      return true;
    } else {
      return false;
    }
  }
};

globalFunctions.greet("Pete");
</script>
