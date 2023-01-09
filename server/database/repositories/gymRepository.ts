import prisma from "../client";

export async function getGyms() {
  return await prisma.gym.findMany({
    include: {
      sessions: true, // Return all fields
    },
  });
}

export async function getGymById(id: string) {
  return await prisma.gym.findUnique({
    where: {
      id: id,
    },
  });
}

export async function addGym(data: any) {
  return await prisma.gym.create({
    data: data,
  });
}

export async function updateGym(id: string, data: any) {
  return await prisma.gym.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deleteGym(id: string) {
  return await prisma.gym.delete({
    where: {
      id: id,
    },
  });
}
