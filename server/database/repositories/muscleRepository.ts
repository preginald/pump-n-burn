import prisma from "../client";

export async function createMuscle(data: any) {
  return await prisma.muscle.create({
    data: data,
  });
}

export async function readMuscles() {
  return await prisma.muscle.findMany({
    include: {
      MuscleGroups: true, // Return all fields
    },
  });
}

export async function readMuscleById(id: string) {
  return await prisma.muscle.findFirst({
    where: {
      id: id,
    },
  });
}

export async function updateMuscle(id: string, data: any) {
  return await prisma.muscle.update({
    where: {
      id: id,
    },
    data: data,
  });
}
