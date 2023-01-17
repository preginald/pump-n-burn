import { updateSession } from "~/server/database/repositories/sessionRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return await updateSession(id, { finish: null });
});
