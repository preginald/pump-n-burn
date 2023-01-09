import { createExercise } from "~/server/database/repositories/exerciseRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const exercise = await createExercise(data);

  return exercise;
});
