import { createMuscle } from "~/server/database/repositories/muscleRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  console.log(data);
  const muscle = await createMuscle(data);

  return muscle;
});
