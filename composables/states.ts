export const useDuration = () => useState("duration", () => "00:00:00.000");

const set = {
  start: "",
  finish: "",
  exercise_id: "",
  weight: "",
  unit: "KG",
  reps_r: "",
  reps_l: "",
  type: "Warm",
  duration: "00:00:00.000",
};

// export const useExercises = () => useState("exercises", () => exercises);
export const useSet = () => useState("set", () => set);

const exercise = {
  id: "",
  name: "Deadlift",
  type: "Barbell",
  mechanics: "Compound",
  force: "Push",
  lateral: "Bi",
};

export const useExercise = () => useState("exercise", () => exercise);
export const useExerciseForm = () => useState("exerciseForm", () => false);

const muscle = {
  id: "",
  name: "",
};

const muscleGroup = {
  id: "",
  name: "",
};

export const useMuscle = () => useState("muscle", () => muscle);
export const useMuscleGroup = () => useState("muscleGroup", () => muscleGroup);
// export const useMuscles = () => useState("muscles", () => []);

async function readMuscles() {
  const { data } = await useFetch("/api/muscles");
  console.log(data);
  return data;
}

export const useMuscles = () =>
  useState("muscles", () => {
    readMuscles();
  });

export const useMuscleForm = () => useState("muscleForm", () => false);
export const useMuscleGroupForm = () =>
  useState("muscleGroupForm", () => false);
