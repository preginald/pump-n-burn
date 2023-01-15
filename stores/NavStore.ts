import { defineStore } from "pinia";

export const useNavStore = defineStore("NavStore", {
  state: () => {
    return {
      navElements: ref([
        {
          order: 0,
          route: "/",
          name: "Home",
        },
        {
          order: 1,
          route: "/gyms",
          name: "Gyms",
        },
        {
          order: 2,
          route: "/sessions",
          name: "Sessions",
        },
        {
          order: 3,
          route: "/exercises",
          name: "Exercises",
        },
        {
          order: 4,
          route: "/muscles",
          name: "Muscles",
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
