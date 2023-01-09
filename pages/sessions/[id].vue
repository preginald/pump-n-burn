<template>
  <h5><span v-if="sessionStore.form">End</span> Session</h5>
  <SessionsEditForm v-if="sessionStore.form" />
  <SessionsCard :session="sessionStore.session" />
  <Restwatch v-if="setStore.rest" />
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
        <button @click="openForm" class="btn-green-lg">Add Set</button>
      </div>
    </div>
  </div>
  <div v-for="set in setStore.sets">
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

const openForm = () => {
  setStore.toggleForm(true);
  setStore.set.start = new Date().toISOString();
  setStore.lastSet();
};
const finishSession = () => {
  console.log("Show form with finish time to now");
  sessionStore.editForm();
  sessionStore.toggleForm(true);
  // console.log("User clicks save button");
  // console.log("Rest counter stops");
  // console.log("Session table updated with finish datetime");
  // console.log("Show resume button");
};
</script>
