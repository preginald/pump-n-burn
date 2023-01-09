import { createMuscleGroup } from "~/server/database/repositories/muscleGroupRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const muscleGroup = await createMuscleGroup(data);

  return muscleGroup;
});
