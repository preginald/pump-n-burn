<template>
  <button @click="push">Push</button>
  <button @click="pop">Pop</button>
  <div class="card-container my-3">
    <div class="grid grid-cols-1">
      <SessionsForm v-if="sessionStore.form" />
      <div v-else>
        <button @click="sessionStore.toggleForm(true)" class="btn-green-lg">
          Add Session
        </button>
      </div>
    </div>
  </div>
  <div v-for="session in sessionStore.sessions">
    <SessionsCard :session="session" />
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/stores/SessionStore";
import { useNavStore } from "@/stores/NavStore";
const sessionStore = useSessionStore();
const navStore = useNavStore();
await sessionStore.readSessions();
let form = ref(true);

let session = ref({
  gymId: "",
  startDateTime: dateToISOLikeButLocal(new Date()),
});

let sessions: any = [];
const { data: gyms } = await useFetch("/api/gyms/get");

async function resetDateTime() {
  // console.log(session.value.startDateTime);
  session.value.startDateTime = dateToISOLikeButLocal(new Date());
}

async function readSessions() {
  const { data } = await useFetch("/api/sessions/get");
  return data;
}
sessions = await readSessions();

// function submit() {
//   createSession();
// }

// async function createSession() {
//   const formData = {
//     start: new Date(session.value.startDateTime).toISOString(),
//     gym_id: session.value.gymId,
//   };

//   await $fetch("/api/sessions/create", {
//     method: "POST",
//     body: formData,
//   }).then(async () => {
//     sessions = await readSessions();
//     const openSession = await sessionStore.readOpenSession();
//     console.log("opensession: ", openSession);
//   });
// }

function dateToISOLikeButLocal(date) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);
  return isoLocal;
}

function push() {
  navStore.pushToNav({
    order: 99,
    route: "/sets",
    name: "Sets",
  });
}
function pop() {
  navStore.popFromNav("Sets");
}
</script>
