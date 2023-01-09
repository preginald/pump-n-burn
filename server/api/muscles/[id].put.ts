import { updateMuscle } from "~/server/database/repositories/muscleRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;

  return await updateMuscle(id, body);
});
