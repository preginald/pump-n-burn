<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <ul class="flex gap-4">
          <li v-for="element in navStore.navElements">
            <!-- {{ element }} -->
            <!-- <NuxtLink :to="element.route">{{ element.name }}</NuxtLink> -->
            <NuxtLink :to="element.route"
              ><Icon :name="element.icon" size="36px" :alt="element.name"
            /></NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>
  <!-- <pre v-if="openSession">{{ openSession }}</pre> -->
  <!-- <pre>{{ sessionStore.openSession }}</pre> -->
  <div class="container mx-auto p-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useNavStore } from "@/stores/NavStore";
import { useSessionStore } from "@/stores/SessionStore";
const navStore = useNavStore();
const sessionStore = useSessionStore();
const openSession = await sessionStore.readOpenSession();

if (openSession.value !== null) {
  if (openSession.value.id !== null) {
    // console.log(openSession);
    navStore.pushToNav({
      order: 99,
      route: "/sessions/" + openSession.value.id,
      name: "Current",
      icon: "healthicons:heart-cardiogram",
    });
  }
}
</script>

<style scoped>
.router-link-exact-active {
  color: red;
}
</style>
