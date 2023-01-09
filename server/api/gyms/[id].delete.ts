import { deleteGym } from "~/server/database/repositories/gymRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  console.log(id);
  const gym = await deleteGym(id);

  return gym;
});
