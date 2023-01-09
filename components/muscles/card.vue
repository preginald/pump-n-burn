<template>
  <div class="card-container">
    <div class="flex justify-between">
      <div>
        <div>
          <h6>{{ muscle.name }}</h6>
        </div>
        <div>
          <p class="id">{{ muscle.id }}</p>
        </div>
      </div>
      <div @mouseover="muscle.hover = true" @mouseleave="muscle.hover = false">
        <div>
          <h6 v-if="muscle.MuscleGroups !== null">
            {{ muscle.MuscleGroups.name }}
          </h6>
        </div>
        <div>
          <p
            v-if="!muscle.expand && muscle.hover"
            @click="editMuscle(muscle)"
            class="btn-txt"
          >
            Edit
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-between"></div>
    <MusclesEditForm v-if="muscle.expand" :muscle="muscle" class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { useMuscleStore } from "@/stores/MuscleStore";
const muscleStore = useMuscleStore();
const { muscle } = defineProps(["muscle"]);

const editMuscle = (muscle: any) => {
  muscle.expand = !muscle.expand;
  muscleStore.muscle = muscle;
};
</script>
