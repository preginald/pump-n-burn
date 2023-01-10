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
      },
    },
  });
}
export async function updateSession(id: string, data: any) {
  return await prisma.session.update({
    where: {
      id: id,
    },
    data: data,
  });
}
