import { createSession } from "~/server/database/repositories/sessionRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  console.log(data);
  const session = await createSession(data);

  return session;
});
