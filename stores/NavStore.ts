import { defineStore } from "pinia";

export const useNavStore = defineStore("NavStore", {
  state: () => {
    return {
      navElements: ref([
        {
          order: 0,
          route: "/",
          name: "Home",
          icon: "ic:sharp-home",
        },
        {
          order: 1,
          route: "/gyms",
          name: "Gyms",
          icon: "healthicons:ministry-of-health",
        },
        {
          order: 2,
          route: "/sessions",
          name: "Sessions",
          icon: "healthicons:i-note-action",
        },
        {
          order: 3,
          route: "/exercises",
          name: "Exercises",
          icon: "healthicons:exercise-weights",
        },
        {
          order: 4,
          route: "/muscles",
          name: "Muscles",
          icon: "healthicons:body",
        },
      ]),
    };
  },
  actions: {
    pushToNav(obj: any) {
      this.navElements = this.navElements.filter(
        (obj) => obj.name !== "Current"
      );
      this.navElements.push(obj);
    },
    popFromNav(name: string) {
      this.navElements = this.navElements.filter((obj) => obj.name !== name);
    },
    resetNav() {
      this.navElements = this.navElements.filter(
        (obj) => obj.name !== "Current"
      );
    },
  },
});
