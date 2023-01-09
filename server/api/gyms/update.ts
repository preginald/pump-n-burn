import { updateGym } from "~/server/database/repositories/gymRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  console.log(body);
  console.log(id);
  // return await getGymById(id);
});
