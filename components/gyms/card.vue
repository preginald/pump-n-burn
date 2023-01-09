<template>
  <div
    @mouseover="gym.hover = true"
    @mouseleave="gym.hover = false"
    class="card-container"
  >
    <div>
      <h6>{{ gym.name }} - {{ gym.address }}</h6>
    </div>
    <div class="flex justify-between">
      <div>
        <span class="id">
          {{ gym.id }}
        </span>
      </div>
      <div>
        <span
          v-show="!gym.expand && gym.hover"
          @click="editGym(gym)"
          class="btn-txt"
        >
          Edit
        </span>
      </div>
    </div>
    <div class="flex justify-between"></div>
    <GymsEditForm v-if="gym.expand" :gym="gym" class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { useGymStore } from "@/stores/GymStore";
const gymStore = useGymStore();
const { gym } = defineProps(["gym"]);

const editGym = (gym: any) => {
  gym.expand = !gym.expand;
  gymStore.gym = gym;
};
</script>
