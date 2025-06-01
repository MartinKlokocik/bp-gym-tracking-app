import SwiftUI

struct ContentView: View {
    @StateObject private var deviceManager = DeviceManager()
    @State private var hasAppeared = false
    
    var body: some View {
        NavigationStack {
            Group {
                if deviceManager.isCheckingPairing {
                    LoadingView()
                } else if deviceManager.isPaired {
                    MainAppView(deviceManager: deviceManager)
                } else {
                    PairingView(deviceManager: deviceManager)
                }
            }
        }
        .onAppear {
            if !hasAppeared {
                hasAppeared = true
                deviceManager.checkPairingStatus()
            }
        }
    }
}

struct LoadingView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image("gym-icon")
                .resizable()
                .scaledToFit()
                .frame(width: 30, height: 30)
            
            ProgressView()
                .scaleEffect(2)
            
            Text("Checking device...")
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

struct MainAppView: View {
    @ObservedObject var deviceManager: DeviceManager
    
    var body: some View {
        VStack(spacing: 10) {
            Image("gym-icon")
                .resizable()
                .scaledToFit()
                .frame(width: 30, height: 30)

            Text("Workout Tracker")
                .font(.headline)

            NavigationLink(destination: WorkoutFlowView(deviceManager: deviceManager)) {
                Text("Start workout")
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
            .tint(.blue)
        }
    }
}


