import { readExerciseById } from "~/server/database/repositories/exerciseRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return await readExerciseById(id);
});
