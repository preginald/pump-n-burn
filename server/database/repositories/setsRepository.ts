import prisma from "../client";

export async function createSet(data: any) {
  return await prisma.set.create({
    data: data,
  });
}

export async function readSets() {
  return await prisma.set.findMany({
    // include: {
    //   // agonists: true, // Return all fields
    //   // include: {
    //   //   muscleGroup: true,
    //   // },
    // },
    // include: { agonists: { include: { agonist: true } } },
  });
}

export async function readSetsBySessionId(sessionId: string) {
  return await prisma.set.findMany({
    where: {
      session_id: sessionId,
    },
    orderBy: {
      start: "desc",
    },
    include: {
      exercise: true, // Return all fields
    },
  });
}
