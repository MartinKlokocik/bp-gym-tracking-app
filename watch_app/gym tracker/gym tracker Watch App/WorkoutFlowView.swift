import SwiftUI
import Foundation

// MARK: - Main View
struct WorkoutFlowView: View {
    @StateObject private var viewModel = WorkoutFlowViewModel()
    
    var body: some View {
        VStack(spacing: 16) {
            switch viewModel.state {
            case .loading:
                Text("Loading workout...")
                
            case .error(let message):
                Text("Error: \(message)")
                
            case .notStarted(let workout):
                NotStartedView(workout: workout, viewModel: viewModel)
                
            case .inProgress(let workout, let exerciseIndex, let setIndex, let isMonitoring):
                WorkoutInProgressView(
                    workout: workout,
                    exerciseIndex: exerciseIndex,
                    setIndex: setIndex,
                    isMonitoring: isMonitoring,
                    nextSet: viewModel.nextSet,
                    toggleMonitor: viewModel.toggleMonitor,
                    completeSet: viewModel.completeSet
                )
                
            case .resting(let workout, let nextExerciseIndex, let nextSetIndex, let restTime):
                WorkoutRestView(
                    workout: workout,
                    nextExerciseIndex: nextExerciseIndex,
                    nextSetIndex: nextSetIndex,
                    restTime: restTime,
                    nextSetAction: viewModel.nextSet
                )
                
            case .finished:
                WorkoutCompletedView()
            }
        }
        .onAppear {
            viewModel.loadData()
        }
        .padding()
    }
}

// MARK: - ViewModel
class WorkoutFlowViewModel: ObservableObject {
    
    enum State {
        case loading
        case error(String)
        case notStarted(WatchesWorkout)
        case inProgress(
            WatchesWorkout,
            exerciseIndex: Int,
            setIndex: Int,
            isMonitoring: Bool
        )
        case resting(
            WatchesWorkout,
            nextExerciseIndex: Int,
            nextSetIndex: Int,
            restTime: Int
        )
        case finished
    }
    
    @Published var state: State = .loading
    
    private let service = GraphQLService()
    
    // MARK: - Data Loading
    func loadData() {
        self.state = .loading
        
        service.fetchWorkoutData { [weak self] result in
            guard let self = self else { return }
            
            switch result {
            case .success(let workout):
                if let workout = workout {
                    self.state = .notStarted(workout)
                } else {
                    self.state = .error("No workout found for this user on today's date.")
                }
            case .failure(let error):
                self.state = .error(error.localizedDescription)
            }
        }
    }
    
    // MARK: - Start Workout
    func startWorkout() {
        switch state {
        case .notStarted(let workout):
            self.state = .inProgress(
                workout,
                exerciseIndex: 0,
                setIndex: 0,
                isMonitoring: false
            )
        default:
            break
        }
    }
    
    // MARK: - Toggle Heart Rate Monitoring
    func toggleMonitor() {
        switch state {
        case .inProgress(let workout, let exerciseIndex, let setIndex, let isMonitoring):
            self.state = .inProgress(
                workout,
                exerciseIndex: exerciseIndex,
                setIndex: setIndex,
                isMonitoring: !isMonitoring
            )
        default:
            break
        }
    }
    
    // MARK: - Complete Set → Move to Rest State
    func completeSet() {
        switch state {
        case .inProgress(let workout, let exerciseIndex, let setIndex, _):
            guard
                let day = workout.plannedWorkoutDay,
                let exercises = day.plannedExercises,
                exerciseIndex < exercises.count,
                let sets = exercises[exerciseIndex].plannedSets,
                setIndex < sets.count
            else {
                self.state = .finished
                return
            }
            
            let currentSet = sets[setIndex]
            let restTime = currentSet.restTime ?? 30
            
            var newExerciseIndex = exerciseIndex
            var newSetIndex = setIndex + 1
            
            if newSetIndex >= sets.count {
                newSetIndex = 0
                newExerciseIndex += 1
            }
            
            if newExerciseIndex >= exercises.count {
                self.state = .finished
            } else {
                self.state = .resting(
                    workout,
                    nextExerciseIndex: newExerciseIndex,
                    nextSetIndex: newSetIndex,
                    restTime: restTime
                )
            }
            
        default:
            break
        }
    }
    
    // MARK: - Next Set → Move from Rest to In Progress
    func nextSet() {
        switch state {
        case .resting(let workout, let nextExerciseIndex, let nextSetIndex, _):
            self.state = .inProgress(
                workout,
                exerciseIndex: nextExerciseIndex,
                setIndex: nextSetIndex,
                isMonitoring: false
            )
        default:
            break
        }
    }
}


// MARK: - Data Models
struct PlannedWorkoutDay {
    var name: String?
    var plannedExercises: [PlannedExercise]?
}

struct PlannedExercise {
    var exercise: Exercise?
    var plannedSets: [PlannedSet]?
}

struct Exercise {
    var name: String?
}

struct PlannedSet {
    var reps: Int?
    var restTime: Int?
}
