import { defineStore } from "pinia";

export const useMuscleStore = defineStore("MuscleStore", {
  state: () => {
    return {
      muscles: ref([]),
      muscle: ref({
        id: "",
        name: "",
        muscleGroupId: "",
      }),
      form: ref(false),
    };
  },

  actions: {
    async readMuscles() {
      const { data } = await useFetch("/api/muscles");
      this.muscles = data;
    },
  },

  // getters
});
