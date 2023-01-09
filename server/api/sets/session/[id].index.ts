import { readSetsBySessionId } from "~/server/database/repositories/setsRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params["id.index"];

  return await readSetsBySessionId(id);
});
