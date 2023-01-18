<template>
  <div class="flex justify-between items-center">
    <h5><span v-if="sessionStore.form">End</span> Session</h5>
    <p class="id">{{ sessionStore.session.id }}</p>
  </div>
  <SessionsEditForm v-if="sessionStore.form" />
  <SessionsCard :session="sessionStore.session" />
  <Restwatch v-if="setStore.rest && sessionStore.inProgress()" />
  <div v-if="!sessionStore.form" class="card-container mt-2">
    <SetsForm v-if="setStore.form" />
    <div v-else>
      <div class="grid gap-3 grid-cols-2">
        <button
          v-if="sessionStore.inProgress() && !sessionStore.form"
          @click="finishSession()"
          class="btn-default-lg"
        >
          End Session
        </button>
        <button
          v-if="sessionStore.inProgress()"
          @click="openForm"
          class="btn-green-lg"
        >
          Add Set
        </button>
      </div>
      <div v-if="!sessionStore.inProgress()" class="grid gap-3 grid-cols-1">
        <button
          @click="sessionStore.reopenSession(sessionStore.session.id)"
          class="btn-green-lg"
        >
          Reopen Session
        </button>
      </div>
    </div>
  </div>
  <div class="mt-2">
    <button
      v-if="cardGroup"
      @click="cardGroup = !cardGroup"
      class="btn-default-md"
    >
      Grouped
    </button>
    <button v-else @click="cardGroup = !cardGroup" class="btn-default-md">
      Ungrouped
    </button>
  </div>
  <div
    v-if="cardGroup"
    v-for="exercise in groupSetsByExercise(sessionStore.session.sets)"
    class="card-container mb-2"
  >
    <div class="flex justify-between">
      <div class="pt-1">
        <h6>{{ exercise.exercise.name }}</h6>
      </div>
      <div>
        <span class="badge-default">{{ exercise.exercise.type }}</span>
      </div>
    </div>
    <div v-for="set in exercise.sets">
      <SetsCarde :set="set" />
    </div>
  </div>
  <div v-else v-for="set in setStore.sets">
    <SetsCard :set="set" />
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/stores/SessionStore";
import { useSetStore } from "@/stores/SetStore";
const sessionStore = useSessionStore();
const setStore = useSetStore();

const session_id: string | string[] = useRoute().params.id;
await sessionStore.readSession(session_id);
await setStore.readSetsBySessionId(session_id);

const cardGroup = ref(true);

const openForm = () => {
  setStore.toggleForm(true);
  setStore.set.start = new Date().toISOString();
  setStore.lastSet();
};
const finishSession = () => {
  sessionStore.editForm();
  sessionStore.toggleForm(true);
  setStore.reset();
};

const groupSetsByExercise = (sets: any[]) => {
  sets.sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  );
  return Object.values(
    sets.reduce((acc, set) => {
      const exerciseId = set.exercise_id;
      if (!acc[exerciseId]) {
        acc[exerciseId] = {
          exercise: { ...set.exercise, start: set.start },
          sets: [],
        };
      }
      acc[exerciseId].sets.push({
        id: set.id,
        start: set.start,
        finish: set.finish,
        duration: set.duration,
        rest: set.rest,
        weight: set.weight,
        reps_r: set.reps_r,
        reps_l: set.reps_l,
        type: set.type,
      });
      return acc;
    }, {})
  );
};
</script>
