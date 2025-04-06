//
//  ContentView.swift
//  gym tracker Watch App
//
//  Created by Martin Klokočík on 05/04/2025.
//

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

                NavigationLink(destination: AppleWatchDataView()) {
                    Text("Start workout")
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .tint(.blue)
                
                NavigationLink(destination: MonitorPulseView()) {
                    Text("Send Pulse 2")
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .tint(.blue)
            }
            .padding()
        }
    }
    
}
#Preview {
    ContentView()
}

