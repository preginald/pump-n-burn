import prisma from "../client";

export async function createSession(data: any) {
  return await prisma.session.create({
    data: data,
  });
}

export async function readSessions() {
  return await prisma.session.findMany({
    orderBy: {
      start: "desc",
    },
    include: {
      gym: true, // Return all fields
      sets: {
        include: {
          exercise: true,
        },
      },
    },
  });
}

export async function readSessionById(id: string) {
  return await prisma.session.findUnique({
    where: {
      id: id,
    },
    include: {
      gym: true, // Return all fields
      sets: {
        include: {
          exercise: true,
        },
        orderBy: {
          start: "desc",
        },
      },
    },
  });
}

export async function getMostRecentOpenSession() {
  const sessions = await prisma.session.findMany({
    where: { finish: null },
    orderBy: { start: "desc" },
  });
  return sessions[0];
}

export async function updateSession(id: string, data: any) {
  return await prisma.session.update({
    where: {
      id: id,
    },
    data: data,
  });
}
