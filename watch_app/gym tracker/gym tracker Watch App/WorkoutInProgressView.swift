import SwiftUI

struct WorkoutInProgressView: View {
    let workout: WatchesWorkout
    let exerciseIndex: Int
    let setIndex: Int
    let isMonitoring: Bool
    
    let nextSet: () -> Void
    let toggleMonitor: () -> Void
    let completeSet: () -> Void
    
    @StateObject private var heartRateManger = HeartRateManager()
    
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
            ScrollView {
                VStack(spacing: 12) {
                    Text(exercise.exercise?.name ?? "Unnamed Exercise")
                        .font(.title3)
                        .lineLimit(nil)
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)
                    
                    Text("Exercise \(exerciseIndex + 1)/\(exercises.count)")

                    Text("Set \(setIndex + 1)/\(sets.count) • \(currentSet.reps ?? 0) reps")
                        .font(.body)

                    if let currentRate = heartRateManger.currentHeartRate {
                        Text("\(Int(currentRate)) bpm")
                            .font(.title3)
                    } else {
                        Text("Loading HR...")
                            .font(.title3)
                    }

                    if !isMonitoring {
                        Button("Monitor") {
                            toggleMonitor()
                            heartRateManger.startMonitoring()
                        }
                    } else {
                        Button("Complete") {
                            completeSet()
                            heartRateManger.stopMonitoring()
                        }
                    }
                }
                .padding(.vertical)
                .onAppear {
                    heartRateManger.requestHealthKitAuthorization()
                }
            }
        )

    }
}
