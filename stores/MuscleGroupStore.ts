import { defineStore } from "pinia";

export const useMuscleGroupStore = defineStore("MuscleGroupStore", {
  state: () => {
    return {
      muscleGroup: ref({
        id: "",
        name: "",
      }),
      muscleGroups: ref({}),
      form: ref(false),
    };
  },

  actions: {
    async readMuscleGroups() {
      const { data } = await useFetch("/api/muscle-groups");
      this.muscleGroups = data;
    },
    resetMuscleGroup() {
      this.muscleGroup = {};
    },
    setForm(status: boolean) {
      this.form = status;
    },
  },

  // getters
});
