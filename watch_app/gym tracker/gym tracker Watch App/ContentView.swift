import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            VStack(spacing: 10) {
                Image(systemName: "globe")
                    .imageScale(.large)
                    .foregroundStyle(.tint)

                Text("Gym Tracker")
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


