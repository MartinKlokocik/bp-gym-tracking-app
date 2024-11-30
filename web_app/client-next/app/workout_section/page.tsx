"use client";

import { useState } from "react";
import WorkoutOverviewComponent from "@/components/WorkoutSection/WorkoutOverview/WorkoutOverviewComponent";
import PlanWorkoutComponent from "@/components/WorkoutSection/WorkoutPlanning/PlanWorkoutComponent";

export default function Home() {
  const [ overview, setOverview ] = useState(true);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <button className="p-1 bg-white text-black rounded m-1" onClick={() => setOverview(true)}>
        My plan overview
      </button>
      <button className="p-1 bg-white text-black rounded m-1" onClick={() => setOverview(false)}>
        Plan editor
      </button>

      <div>
        {overview 
        ? (<WorkoutOverviewComponent></WorkoutOverviewComponent>)
        : (<PlanWorkoutComponent></PlanWorkoutComponent>)
        }
      </div>
    </div>
  );
}
