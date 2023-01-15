import { getMostRecentOpenSession } from "~/server/database/repositories/sessionRepository";

export default defineEventHandler(async (event) => {
  return await getMostRecentOpenSession();
});
