import { updateGym } from "~/server/database/repositories/gymRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;

  return await updateGym(id, body);
});
