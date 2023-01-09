import { updateExercise } from "~/server/database/repositories/exerciseRepository";

export default defineEventHandler(async (event) => {
  // console.log(event);
  const body = await readBody(event);
  const id = event.context.params["id.index"];

  return await updateExercise(id, body);
});
