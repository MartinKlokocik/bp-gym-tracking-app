"use client"

import { PlanedExercises } from "./PlanCreatorDayCard";

interface PlanProps {
    summaryProps: {
        numberOfWorkingDays: number;
        name: string;
        description: string;
        isPublic: boolean;
        eachDayExercises: PlanedExercises[][];
    };
}


export default function PlanCreatorSummaryCard({ summaryProps }: PlanProps) {
    const {
        numberOfWorkingDays,
        name,
        description,
        isPublic,
        eachDayExercises,
      } = summaryProps;


    return (
        <>
            <h2>Summary</h2>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            <p>Public: {isPublic ? "Yes" : "No"}</p>
            <p>Number of Days: {numberOfWorkingDays}</p>
            {/* Render exercises */}
            {eachDayExercises.map((day, index) => (
                <div key={index}>
                <h3>Day {index + 1}</h3>
                {day.map((workout, idx) => (
                    <p key={idx}>
                    {workout.exercise?.name} - {workout.reps} reps
                    </p>
                ))}
                </div>
            ))}
        </>
    )

}