import SwiftUI

struct WorkoutRestView: View {
    let workout: WatchesWorkout
    let nextExerciseIndex: Int
    let nextSetIndex: Int
    let restTime: Int
    let nextSetAction: () -> Void
    
    @State private var timeLeft: Int
    @State private var timer: Timer? = nil
    
    private var nextButtonLabel: String {
        if nextSetIndex == 0 {
            return "Next Exercise"
        } else {
            return "Next Set"
        }
    }
    
    init(workout: WatchesWorkout,
         nextExerciseIndex: Int,
         nextSetIndex: Int,
         restTime: Int,
         nextSetAction: @escaping () -> Void) {
        
        self.workout = workout
        self.nextExerciseIndex = nextExerciseIndex
        self.nextSetIndex = nextSetIndex
        self.restTime = restTime
        self.nextSetAction = nextSetAction
        
        _timeLeft = State(initialValue: restTime)
    }
    
    var body: some View {
        guard
            let day = workout.plannedWorkoutDay,
            let exercises = day.plannedExercises,
            nextExerciseIndex < exercises.count,
            let sets = exercises[nextExerciseIndex].plannedSets,
            nextSetIndex < sets.count
        else {
            return AnyView(Text("No more exercises").padding())
        }
        
        let exercise = exercises[nextExerciseIndex]
        let nextPlannedSet = sets[nextSetIndex]
        
        return AnyView(
            VStack(spacing: 12) {
                Text("Rest: \(timeLeft) sec")
                    .font(.headline)
                
                Text("Up Next:")
                Text(exercise.exercise?.name ?? "Unnamed Exercise")
                    .font(.subheadline)
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
                
                Text("Set \(nextSetIndex + 1)/\(sets.count)")
                Text("\(nextPlannedSet.reps ?? 0) reps")
                
                Button(nextButtonLabel) {
                    self.timer?.invalidate()
                    nextSetAction()
                }
            }
            .padding()
            .onAppear {
                startCountdown()
            }
            .onDisappear {
                timer?.invalidate()
            }
        )
    }
    
    private func startCountdown() {
        timer?.invalidate()
        
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { tempTimer in
            if timeLeft > 0 {
                timeLeft -= 1
            } else {
                tempTimer.invalidate()
            }
        }
    }
}
