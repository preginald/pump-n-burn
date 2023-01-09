import { readSets } from "~/server/database/repositories/setsRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const sets = await readSets();

  return sets;
});
