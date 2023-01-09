import { defineStore } from "pinia";

export const useExerciseStore = defineStore("ExerciseStore", {
  state: () => {
    return {
      exercises: ref([]),
      exercise: ref({
        id: "",
        name: "",
        type: "",
        mechanics: "",
        force: "",
        lateral: "",
      }),
      form: ref(false),
    };
  },

  actions: {
    async readExercises() {
      const { data } = await useFetch("/api/exercises");
      this.exercises = data;
    },
    toggleForm(state: boolean) {
      this.form = state;
    },
  },

  // getters
});
