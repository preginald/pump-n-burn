import { updateSession } from "~/server/database/repositories/sessionRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;

  return await updateSession(id, body);
});
