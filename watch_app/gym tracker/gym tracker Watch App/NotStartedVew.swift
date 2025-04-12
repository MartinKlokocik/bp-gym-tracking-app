import SwiftUI

struct NotStartedView: View {
    let workout: WatchesWorkout
    let viewModel: WorkoutFlowViewModel
    
    var body: some View {
        if let workoutDay = workout.plannedWorkoutDay {
            VStack(alignment: .center, spacing: 8) {
                Text(workoutDay.name ?? "No Workout Name")
                    .font(.headline)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                
                let exerciseCount = workoutDay.plannedExercises?.count ?? 0
                Text("\(exerciseCount) \(exerciseCount == 1 ? "exercise" : "exercises")")
                    .multilineTextAlignment(.center)
                
                Button("Start Workout") {
                    viewModel.startWorkout()
                }
            }
            .padding()
        } else {
            Text("No workout data found.")
        }
    }
}
