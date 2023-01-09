import { readSessions } from "~/server/database/repositories/sessionRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const sessions = await readSessions();

  return sessions;
});
