import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            VStack(spacing: 10) {
                Image("gym-icon")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 30, height: 30)

                Text("Workout Tracker")
                    .font(.headline)

                NavigationLink(destination: WorkoutFlowView()) {
                    Text("Start workout")
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .tint(.blue)
            }
        }
    }
    
}


