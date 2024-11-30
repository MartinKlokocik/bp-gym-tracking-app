"use client"

import { useState } from "react"

export interface PlanCreatorGeneralCardProps {
    updateParentProps: (props: UpdatedProps) => void;
  }
  
export interface UpdatedProps {
    name: string;
    description: string;
    numberOfWorkingDays: number;
    isPublic: boolean;
}

export default function PlanCreatorGeneralCard({ updateParentProps }: PlanCreatorGeneralCardProps) {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ numberOfWorkingDays, setNumberOfWorkingDays ] = useState(0)
    const [ isPublic, setIsPublic ] = useState(false)

    
    const handleChange = () => {
        const updatedProps = {
            name: name,
            description: description,
            numberOfWorkingDays: numberOfWorkingDays,
            isPublic: isPublic
        };

        updateParentProps(updatedProps);
    }
    return (
        <>
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
                Number of working days:
                <input
                    type="number"
                    value={numberOfWorkingDays}
                    onChange={(e) => setNumberOfWorkingDays(parseInt(e.target.value, 10))}
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
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4"
                />
                Custom Exercise?
            </label>
            <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleChange}
            >
                Next
            </button>
        </>
    )
}