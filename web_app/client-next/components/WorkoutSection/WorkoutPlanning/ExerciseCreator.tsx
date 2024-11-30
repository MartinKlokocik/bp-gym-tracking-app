"use client"

import { useState } from "react";
import { Exercise, CREATE_EXERCISE } from "@/graphql/ExercisesConsts";
import { useMutation } from "@apollo/client";

export default function ExerciseCreator() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [musclesTargeted, setMusclesTargeted] = useState("");
    const [equipmentRequired, setEquipmentRequired] = useState("");
    const [isCustom, setIsCustom] = useState(false);

    const [createExercise, { loading: creatingExercise, error: createError }] = useMutation<{
        createExercise: Exercise;
    }>(CREATE_EXERCISE, {
        onCompleted: () => {

            setName("");
            setDescription("");
            setMusclesTargeted("");
            setEquipmentRequired("");
            setIsCustom(false);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createExercise({
                variables:{
                    name,
                    description,
                    musclesTargeted,
                    equipmentRequired,
                    isCustom
                }
            })
        }
        catch(err) {
            console.error("Error: ", err);
        }        
        
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Create New Exercise</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                Name: <span className="text-red-600">*</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded text-black"
                    required
                />
                </label>
                <label className="flex flex-col">
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded text-black"
                    placeholder="Optional"
                />
                </label>
                <label className="flex flex-col">
                Muscles Targeted:
                <input
                    type="text"
                    value={musclesTargeted}
                    onChange={(e) => setMusclesTargeted(e.target.value)}
                    className="border p-2 rounded text-black"
                    placeholder="Optional"
                />
                </label>
                <label className="flex flex-col">
                Equipment Required:
                <input
                    type="text"
                    value={equipmentRequired}
                    onChange={(e) => setEquipmentRequired(e.target.value)}
                    className="border p-2 rounded text-black"
                    placeholder="Optional"
                />
                </label>
                <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isCustom}
                    onChange={(e) => setIsCustom(e.target.checked)}
                    className="w-4 h-4"
                />
                Custom Exercise?
                </label>
                <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={creatingExercise}
                >
                Create Exercise
                </button>
                {createError && (
                    <p className="text-red-600">Error creating user: {createError.message}</p>
                )}
            </form>
        </div>
    );
}