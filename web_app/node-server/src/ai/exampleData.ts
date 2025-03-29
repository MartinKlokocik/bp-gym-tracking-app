export const exerciseType = "bench_press";

export const previousWorkouts = [
  {
    id: "5",
    userId: "123",
    exerciseId: "bench_press",
    recordSets: [
      { id: "set1", reps: 9, weight: 60, restTime: 90, setNumber: 1 },
      { id: "set2", reps: 8, weight: 80, restTime: 90, setNumber: 2 },
      { id: "set3", reps: 7, weight: 95, restTime: 90, setNumber: 3 },
    ],
    date: "2025-04-07",
    notes: "",
    status: "COMPLETED",
  },
  {
    id: "4",
    userId: "123",
    exerciseId: "bench_press",
    recordSets: [
      { id: "set1", reps: 10, weight: 80, restTime: 90, setNumber: 1 },
      { id: "set2", reps: 9, weight: 85, restTime: 90, setNumber: 2 },
      { id: "set3", reps: 8, weight: 90, restTime: 90, setNumber: 3 },
    ],
    date: "2025-04-01",
    notes: "",
    status: "COMPLETED",
  },
  {
    id: "3",
    userId: "123",
    exerciseId: "bench_press",
    recordSets: [
      { id: "set1", reps: 8, weight: 80, restTime: 90, setNumber: 1 },
      { id: "set2", reps: 7, weight: 85, restTime: 90, setNumber: 2 },
      { id: "set3", reps: 6, weight: 95, restTime: 90, setNumber: 3 },
    ],
    date: "2025-03-17",
    notes: "",
    status: "COMPLETED",
  },
  {
    id: "2",
    userId: "123",
    exerciseId: "bench_press",
    recordSets: [
      { id: "set1", reps: 8, weight: 80, restTime: 90, setNumber: 1 },
      { id: "set2", reps: 6, weight: 90, restTime: 90, setNumber: 2 },
      { id: "set3", reps: 5, weight: 95, restTime: 90, setNumber: 3 },
    ],
    date: "2025-03-10",
    notes: "",
    status: "COMPLETED",
  },
  {
    id: "1",
    userId: "123",
    exerciseId: "bench_press",
    recordSets: [
      { id: "set1", reps: 9, weight: 60, restTime: 90, setNumber: 1 },
      { id: "set2", reps: 8, weight: 80, restTime: 90, setNumber: 2 },
      { id: "set3", reps: 7, weight: 90, restTime: 90, setNumber: 3 },
    ],
    date: "2025-03-03",
    notes: "",
    status: "COMPLETED",
  },
];

export const userData = {
  age: 32,
  weight: 85, // in kg
  height: 180, // in cm
  experienceLevel: "intermediate",
  preference: "gain muscles",
};

export const numberOfSets = 3;

export function getJsonForPrompt(
  numberOfSets: number
) {
  let schema = "{\n";

  for (let i = 1; i <= numberOfSets; i++) {
    schema += `  "set_${i}": {\n`;
    schema += '    "adjustment": "increase" | "decrease" | "maintain",\n';
    schema += '    "next_weight": number,\n';
    schema += '    "next_reps": number,\n';
    schema += '    "reason": "very short reason"\n';
    schema += i === numberOfSets ? "  }\n" : "  },\n";
  }

  schema += '  "strategy": "concise short overall recommendation"\n}';
  return schema;
}

