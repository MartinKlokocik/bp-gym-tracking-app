import SwiftUI

struct WorkoutInProgressView: View {
    let workout: WatchesWorkout
    let exerciseIndex: Int
    let setIndex: Int
    let isMonitoring: Bool
    let deviceUUID: String
    
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
                VStack(spacing: 10) {
                    VStack(spacing: 2){
                        Text(exercise.exercise?.name ?? "Unnamed Exercise")
                            .font(.title3)
                            .multilineTextAlignment(.center)
                            .fixedSize(horizontal: false, vertical: true)

                        Text("Exercise \(exerciseIndex + 1)/\(exercises.count)")
                            .font(.body)

                        Text("Set \(setIndex + 1)/\(sets.count) • \(currentSet.reps ?? 0) reps")
                            .font(.body)

                        if let currentRate = heartRateManger.currentHeartRate {
                            Text("\(Int(currentRate)) bpm")
                                .font(.title3)
                        } else if isMonitoring {
                            Text("Calculating HR...")
                                .font(.title3)
                        }
                    }

                    if !isMonitoring {
                        Button("Monitor HR") {
                            toggleMonitor()
                            heartRateManger.startMonitoring()
                        }
                    } else {
                        Button("Complete") {
                            completeSet()
                            let exerciseId = exercise.exercise?.id ?? ""
                            let calendarDayId = workout.id ?? ""
                            heartRateManger.stopMonitoring(setIndex: setIndex, exerciseIndex: exerciseIndex, exerciseId: exerciseId, calendarDayId: calendarDayId, deviceUUID: deviceUUID)
                        }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                        .tint(.green)
                    }
                }
                .padding(.zero)
                .frame(maxHeight: .infinity, alignment: .top)
                .navigationBarBackButtonHidden(true)
                .edgesIgnoringSafeArea(.bottom)
                .onAppear {
                    heartRateManger.requestHealthKitAuthorization()
                }
        )
    }
}
