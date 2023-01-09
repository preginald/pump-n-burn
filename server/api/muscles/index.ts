import { readMuscles } from "~/server/database/repositories/muscleRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const muscles = await readMuscles();

  return muscles;
});
