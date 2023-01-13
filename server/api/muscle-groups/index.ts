// import { readMuscleGroups } from "~/server/database/repositories/muscleGroupRepository";
import { readMuscleGroups } from "~/server/database/repositories/muscleGroupRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const muscleGroups = await readMuscleGroups();

  return muscleGroups;
});
