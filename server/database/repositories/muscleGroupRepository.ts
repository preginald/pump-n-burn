import prisma from "../client";

export async function createMuscleGroup(data: any) {
  return await prisma.muscleGroup.create({
    data: data,
  });
}

export async function readMuscleGroups() {
  return await prisma.muscleGroup.findMany({
    include: {
      muscles: true, // Return all fields
    },
  });
}

export async function readMuscleGroupById(id: string) {
  return await prisma.muscleGroup.findFirst({
    where: {
      id: id,
    },
  });
}
