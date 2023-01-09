import { defineStore } from "pinia";

export const useGymStore = defineStore("GymStore", {
  state: () => {
    return {
      gyms: ref([]),
      gym: ref({
        id: "",
        name: "",
        address: "",
        sessions: [],
        hover: false,
        expand: false,
      }),
      form: ref(false),
    };
  },

  actions: {
    async readGyms() {
      const { data } = await useFetch("/api/gyms");
      this.gyms = data;
    },
    toggleForm(state: boolean) {
      this.form = state;
    },
  },

  // getters
});
