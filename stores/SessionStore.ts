import { defineStore } from "pinia";

function dateToISOLikeButLocal(date) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);
  return isoLocal;
}

export const useSessionStore = defineStore("SessionStore", {
  state: () => {
    return {
      sessions: ref([]),
      session: ref({
        id: "",
        gymId: "",
        startDateTime: dateToISOLikeButLocal(new Date()),
        finishDateTime: dateToISOLikeButLocal(new Date()),
        sets: [],
      }),
      openSession: ref({}),
      formData: ref({
        id: "",
        gymId: "",
        start: "",
        finish: "",
      }),
      form: ref(false),
    };
  },

  actions: {
    async readSessions() {
      const { data } = await useFetch("/api/sessions");
      this.sessions = data;
    },
    async readSession(id: string) {
      const { data } = await useFetch("/api/sessions/" + id);
      this.session = data;
    },
    async readOpenSession() {
      const { data: openSession } = await useFetch("/api/sessions/open");
      this.openSession = openSession;
      return openSession;
    },
    async reopenSession(id: string) {
      const { data } = await useFetch("/api/sessions/reopen/" + id);
      return data;
    },
    toggleForm(state: boolean) {
      this.form = state;
    },
    inProgress() {
      return this.session.finish === null;
    },
    hasSets() {
      return this.session.sets.length > 0;
    },
    editForm() {
      this.formData.id = this.session.id;
      this.formData.start = dateToISOLikeButLocal(new Date(this.session.start));
      this.formData.finish = dateToISOLikeButLocal(new Date());
      this.formData.gymId = this.session.gym_id;
    },
  },

  // getters
});
