"use client";

import { useState } from "react";
import ExerciseCreator from "./ExerciseCreator";
import PlanCreator from "./PlanCreator";

export default function PlanWorkoutComponent() {
  const [ activeView, setActiveView ] = useState("WorkoutCreator");

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <button className={`p-1 rounded m-1 border ${
          activeView === "ExerciseCreator" ? "bg-white text-black" : "bg-black text-white"
        }`} 
        onClick={() => setActiveView("ExerciseCreator")}>
        Create Exercise
      </button>
      <button className={`p-1 rounded m-1 border ${
          activeView === "PlanCreator" ? "bg-white text-black" : "bg-black text-white"
        }`} 
        onClick={() => setActiveView("PlanCreator")}>
        Create Plan
      </button>

      <div>
        {activeView == "ExerciseCreator" && <ExerciseCreator></ExerciseCreator>}
        {activeView == "PlanCreator" && <PlanCreator></PlanCreator>}
      </div>
    </div>
  );
}