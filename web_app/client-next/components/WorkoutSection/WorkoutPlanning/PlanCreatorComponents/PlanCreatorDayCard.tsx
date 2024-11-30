"use client"

import { useState } from "react"

export interface PlanedExercises {
    exercise: string;
    reps: number;
    restTime: number;
  }

interface PlanCreatorDayCardProps {
    updateParentProps: (workouts: PlanedExercises[]) => void;
    currentDayProp: number;
}

export default function PlanCreatorDayCard({ updateParentProps, currentDayProp }: PlanCreatorDayCardProps) {
    const [ workouts, setWorkouts ] = useState([
        { exercise: "", reps: 0, restTime: 0 }
    ])

    const handleAddExercise = () => {
        setWorkouts([
            ...workouts,
            { exercise: "", reps: 0, restTime: 0 }
        ])
    }

    const handleChange = (index: number, field: string, value: string | number) => {
        const updatedWorkouts = workouts.map((workout, i) =>
          i === index ? { ...workout, [field]: value } : workout
        );
        setWorkouts(updatedWorkouts);
      };

    const handleNext = () => {
        updateParentProps(workouts);
        setWorkouts([
            { exercise: "", reps: 0, restTime: 0 }
        ]);
        console.log("dayUPdated")
    }

    return (
        <>  
            <h2>Planning day {currentDayProp}</h2>
            {workouts.map((workout, index) => (
            <div key={index} className="border p-4 rounded">
                <label className="flex flex-col mb-2">
                Exercise:
                <input
                    type="text"
                    value={workout.exercise}
                    onChange={(e) =>
                    handleChange(index, "exercise", e.target.value)
                    }
                    className="border p-2 rounded text-black"
                    required
                />
                </label>
                <label className="flex flex-col mb-2">
                Reps:
                <input
                    type="number"
                    value={workout.reps}
                    onChange={(e) =>
                    handleChange(index, "reps", parseInt(e.target.value, 10))
                    }
                    className="border p-2 rounded text-black"
                    required
                />
                </label>
                <label className="flex flex-col mb-2">
                Rest Time (sec):
                <input
                    type="number"
                    value={workout.restTime}
                    onChange={(e) =>
                    handleChange(index, "restTime", parseInt(e.target.value, 10))
                    }
                    className="border p-2 rounded text-black"
                    required
                />
                </label>
            </div>
            ))}
            <button
            type="button"
            onClick={handleAddExercise}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
                Add Exercise
            </button>
            <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleNext}
            >
                Next
            </button>
        </>
    )
}