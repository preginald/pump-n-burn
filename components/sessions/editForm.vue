<template>
  <div>
    <div class="grid gap-6 mb-6 grid-cols-1">
      <div class="flex">
        <input
          type="datetime-local"
          v-model="sessionStore.formData.start"
          readonly
        />
        <input type="datetime-local" v-model="sessionStore.formData.finish" />
        <button class="btn" @click="resetFinish">
          <Icon name="ic:baseline-refresh" />
        </button>
      </div>
      <div>
        <select
          v-model="sessionStore.formData.gymId"
          placeholder="Gym"
          readonly
        >
          <option v-for="gym in gymStore.gyms" :value="gym.id">
            {{ gym.name }}
          </option>
        </select>
      </div>

      <div class="grid gap-6 mb-6 grid-cols-2">
        <button @click="cancelEditForm" class="btn-default-lg">Cancel</button>
        <button @click="submitForm" class="btn-green-lg">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/stores/SessionStore";
import { useGymStore } from "@/stores/GymStore";
import globalfunctions from "@/utils/global-functions";
const sessionStore = useSessionStore();
const gymStore = useGymStore();
await gymStore.readGyms();

async function resetFinish() {
  sessionStore.formData.finish = globalfunctions.dateToISOLikeButLocal(
    new Date()
  );
  console.log("Resetting finish date/time");
}
const submitForm = async () => {
  // console.log(exerciseStore.exercise);
  const id = sessionStore.formData.id;
  const formData = {
    start: new Date(sessionStore.formData.start).toISOString(),
    finish: new Date(sessionStore.formData.finish).toISOString(),
    gym_id: sessionStore.formData.gymId,
  };

  await $fetch("/api/sessions/" + id, {
    method: "PUT",
    body: formData,
  }).then(async () => {
    await sessionStore.readSessions();
    sessionStore.toggleForm(false);
    sessionStore.formData = {};
    await sessionStore.readSession(id);
    // sessionStore.session = {};
  });
};

const cancelEditForm = () => {
  sessionStore.toggleForm(false);
  sessionStore.formData = {};
  console.log("Edit form closed");
};
</script>
