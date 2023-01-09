import { createSet } from "~/server/database/repositories/setsRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  console.log(data);
  const set = await createSet(data);

  return set;
});
