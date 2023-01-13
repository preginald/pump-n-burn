import prisma from "../client";

export async function createMuscleGroup(data: any) {
  return await prisma.muscleGroup.create({
    data: data,
  });
}

// export async function readMuscleGroups() {
//   return await prisma.muscleGroup.findMany({
//     include: {
//       muscles: true, // Return all fields
//       exercises: true, // Return all fields
//     },
//   });
// }

export async function readMuscleGroups() {
  const muscleGroups = await prisma.muscleGroup.findMany({
    include: {
      exercises: {
        include: {
          exercise: {
            include: {
              sets: {
                select: { start: true },
                orderBy: { start: "desc" },
              },
            },
          },
        },
      },
    },
  });

  muscleGroups.forEach((muscleGroup) => {
    const mostRecentSet = muscleGroup.exercises.flatMap(
      (exercise) => exercise.exercise.sets
    )[0];
    muscleGroup.mostRecentSetStart = mostRecentSet ? mostRecentSet.start : null;
  });

  return muscleGroups.sort((a, b) =>
    a.mostRecentSetStart > b.mostRecentSetStart ? 1 : -1
  );
}

export async function readMuscleGroupById(id: string) {
  return await prisma.muscleGroup.findFirst({
    where: {
      id: id,
    },
  });
}
