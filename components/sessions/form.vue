<template>
  <div>
    <div class="grid gap-6 mb-6 grid-cols-1">
      <div class="flex">
        <input
          type="datetime-local"
          v-model="sessionStore.session.startDateTime"
        />
        <button class="btn" @click="resetDateTime">
          <Icon name="ic:baseline-refresh" />
        </button>
      </div>
      <div>
        <select v-model="sessionStore.session.gymId" placeholder="Type">
          <option value="" disabled hidden>Select Gym</option>

          <option
            v-for="gym in gymStore.gyms"
            :value="gym.id"
            :selected="gym.id == 'e4a12fd6-5540-45ce-a977-d347f8f3ca49'"
          >
            {{ gym.name }}
          </option>
        </select>
      </div>

      <div class="grid gap-6 mb-6 grid-cols-2">
        <button @click="sessionStore.toggleForm(false)" class="btn-default-lg">
          Cancel
        </button>
        <button @click="submitForm" class="btn-green-lg">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from "@/stores/SessionStore";
import { useGymStore } from "@/stores/GymStore";
import { useNavStore } from "@/stores/NavStore";
import globalfunctions from "@/utils/global-functions";
const sessionStore = useSessionStore();
const gymStore = useGymStore();
const navStore = useNavStore();

await gymStore.readGyms();

async function resetDateTime() {
  sessionStore.session.startDateTime = globalfunctions.dateToISOLikeButLocal(
    new Date()
  );
}
const submitForm = async () => {
  // console.log(exerciseStore.exercise);
  const formData = {
    start: new Date(sessionStore.session.startDateTime).toISOString(),
    gym_id: sessionStore.session.gymId,
  };

  await $fetch("/api/sessions/create", {
    method: "POST",
    body: formData,
  }).then(async (e) => {
    await sessionStore.readSessions();

    navStore.pushToNav({
      order: 99,
      route: "/sessions/" + e.id,
      name: "Current",
      icon: "healthicons:heart-cardiogram",
    });
    sessionStore.toggleForm(false);
    useRouter().push({ path: "/sessions/" + e.id });
  });
};
</script>
