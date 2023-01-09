import { getGyms } from "~/server/database/repositories/gymRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const gyms = await getGyms();

  return gyms;
});
