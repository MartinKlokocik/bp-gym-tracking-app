import SwiftUI

struct PairingView: View {
    @ObservedObject var deviceManager: DeviceManager
    
    var body: some View {
        VStack(spacing: 16) {
            Text("Pair Your Watch")
                .font(.headline)
                .multilineTextAlignment(.center)
            
            Text("Enter in the web app:")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
            
            // UUID Display
            VStack(spacing: 8) {
                Text(deviceManager.deviceUUID)
                    .font(.system(.title, design: .monospaced))
                    .fontWeight(.bold)
                    .foregroundColor(.primary)
                    .padding(6)
                    .multilineTextAlignment(.center)
            }
            
            // Refresh button
            Button(action: {
                deviceManager.refreshPairingStatus()
            }) {
                HStack {
                    if deviceManager.isCheckingPairing {
                        ProgressView()
                            .scaleEffect(0.8)
                    } else {
                        Image(systemName: "arrow.clockwise")
                    }
                    Text("Check Status")
                }
            }
            .buttonStyle(.borderedProminent)
            .disabled(deviceManager.isCheckingPairing)
            
            // Error message
            if let error = deviceManager.pairingError {
                Text(error)
                    .font(.caption2)
                    .foregroundColor(.red)
                    .multilineTextAlignment(.center)
            }
        }
        .padding()
        .onAppear {
            deviceManager.checkPairingStatus()
        }
    }
}

#Preview {
    PairingView(deviceManager: DeviceManager())
} 
