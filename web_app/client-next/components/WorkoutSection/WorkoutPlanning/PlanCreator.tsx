"use client"

import { useState } from "react";
import PlanCreatorGeneralCard, { UpdatedProps } from "./PlanCreatorComponents/PlanCreatorGeneralCard";
import PlanCreatorDayCard, { PlanedExercises } from "./PlanCreatorDayCard";


export default function PlanCreator() {
    const [ currentAction, setCurrentAction ] = useState("general");
    const [ currentDay, setCurrentDay ] = useState(1);
    const [ numberOfWorkingDays, setNumberOfWorkingDays ] = useState(0)

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ isPublic, setIsPublic ] = useState(false)

    const [ eachDayExercises, setEachDayExercises ] = useState<PlanedExercises[][]>([]);

    const updatePropsFromChildGeneral = (newProps: UpdatedProps) => {
        setName(newProps.name);
        setDescription(newProps.description);
        setNumberOfWorkingDays(newProps.numberOfWorkingDays);
        setIsPublic(newProps.isPublic);

        setCurrentAction("day");
    }

    const updatePropsFromChildExerciseDay = (newProps: PlanedExercises[]) => {
        const updatedExercises = [...eachDayExercises, newProps];
        setEachDayExercises(updatedExercises);

        console.log(eachDayExercises);
        setCurrentDay(currentDay + 1);

        if (currentDay >= numberOfWorkingDays) {
            setCurrentAction("sumary");
        }
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form sent");
        console.log(name);
        console.log(description);
        console.log(numberOfWorkingDays);
        console.log(isPublic);
        console.log(eachDayExercises);
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Create New Plan</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {currentAction == "general" && 
                    <PlanCreatorGeneralCard updateParentProps={updatePropsFromChildGeneral}></PlanCreatorGeneralCard>
                }
                {currentAction == "day" &&
                    <PlanCreatorDayCard currentDayProp={currentDay} updateParentProps={updatePropsFromChildExerciseDay}></PlanCreatorDayCard>
                }
                {currentAction == "sumary" &&
                    <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                    >
                        Create Plan
                    </button>
                }
            </form>
        </div>
    );
}