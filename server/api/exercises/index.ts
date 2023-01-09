import { readExercises } from "~/server/database/repositories/exerciseRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const exercises = await readExercises();

  return exercises;
});
