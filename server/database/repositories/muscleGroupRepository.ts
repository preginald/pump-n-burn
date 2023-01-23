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
              },
            },
          },
        },
      },
    },
  });

  muscleGroups.forEach((muscleGroup) => {
    const sets = muscleGroup.exercises.flatMap(
      (exercise) => exercise.exercise.sets
    );
    const mostRecentSetStart = sets.reduce((mostRecent, set) => {
      if (!mostRecent || new Date(set.start) > new Date(mostRecent)) {
        return set.start;
      }
      return mostRecent;
    }, null);
    muscleGroup.mostRecentSetStart = mostRecentSetStart;
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
