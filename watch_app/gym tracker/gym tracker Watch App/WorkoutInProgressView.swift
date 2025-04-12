import SwiftUI

struct WorkoutInProgressView: View {
    let workout: WatchesWorkout
    let exerciseIndex: Int
    let setIndex: Int
    let isMonitoring: Bool
    
    let nextSet: () -> Void
    let toggleMonitor: () -> Void
    let completeSet: () -> Void
    
    var body: some View {
        guard
            let day = workout.plannedWorkoutDay,
            let exercises = day.plannedExercises,
            exerciseIndex < exercises.count
        else {
            return AnyView(Text("No exercises"))
        }
        
        let exercise = exercises[exerciseIndex]
        let sets = exercise.plannedSets ?? []
        
        if setIndex >= sets.count {
            return AnyView(Text("No more sets..."))
        }
        
        let currentSet = sets[setIndex]
        
        return AnyView(
            VStack(spacing: 12) {
                Text(exercise.exercise?.name ?? "Unnamed Exercise")
                    .font(.title3)
                    .lineLimit(nil)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                
                Text("Exercise \(exerciseIndex + 1)/\(exercises.count)")
                
                Text("Set \(setIndex + 1)/\(sets.count)")
                Text("\(currentSet.reps ?? 0) reps")

                if !isMonitoring {
                    Button("Monitor") {
                        // Toggle monitoring on
                        toggleMonitor()
                        // ---- PUT YOUR MONITORING LOGIC HERE ----
                    }
                } else {
                    Button("Complete") {
                        completeSet()
                    }
                    
                    // ---- THIS IS WHERE YOU COULD CONTINUE MONITORING LOGIC ----
                    // e.g. show real-time heart rate data, steps, etc.
                }
            }
        )
    }
}
