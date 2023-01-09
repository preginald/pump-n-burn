import { addGym } from "~/server/database/repositories/gymRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  console.log(data);
  const gym = await addGym(data);

  return gym;
});
