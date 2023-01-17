import prisma from "../client";

export async function createExercise(data: any) {
  const testing: any[] = [];
  const agonists = data.agonists;
  delete data["agonists"];

  agonists.forEach((element: any) => {
    testing.push({
      agonist: {
        connect: {
          id: element,
        },
      },
    });
  });
  data.agonists = { create: testing };

  return await prisma.exercise.create({
    data: data,
  });
}

export async function readExercises() {
  const exercises = await prisma.exercise.findMany({
    orderBy: { name: "asc" },
    include: { agonists: { include: { agonist: true } }, sets: true },
  });

  exercises.forEach((exercise) => {
    const mostRecentSetStart = exercise.sets[0] ? exercise.sets[0].start : null;
    exercise.mostRecentSetStart = mostRecentSetStart;
  });
  return exercises;
}

export async function readExerciseById(id: string) {
  return await prisma.exercise.findFirst({
    where: {
      id: id,
    },
  });
}

export async function updateExercise(id: string, data: any) {
  const testing: any[] = [];
  const agonists = data.agonists;
  delete data["agonists"];

  agonists.forEach((element: any) => {
    testing.push({
      agonist: {
        connect: {
          id: element,
        },
      },
    });
  });

  data.agonists = { create: testing };

  // Delete the existing ExerciseAgonist records for this exercise
  await prisma.ExerciseAgonist.deleteMany({
    where: { exerciseId: id },
  });

  return await prisma.exercise.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deleteExercise(id: string) {
  return await prisma.exercise.delete({
    where: {
      id: id,
    },
  });
}
