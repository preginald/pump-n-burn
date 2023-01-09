import { getGymById } from "~/server/database/repositories/gymRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return await getGymById(id);
});
