//
//  WorkoutView.swift
//  gym tracker Watch App
//
//  Created by Martin Klokočík on 05/04/2025.
//

import SwiftUI

struct AppleWatchDataView: View {
    @StateObject private var viewModel = AppleWatchDataViewModel()

    var body: some View {
        VStack {
            if let steps = viewModel.steps {
                Text("Steps: \(steps)")
            } else if let errorMessage = viewModel.errorMessage {
                Text("Error: \(errorMessage)")
            } else {
                Text("Loading...")
            }
        }
        .onAppear {
            viewModel.loadData()
        }
    }
}

class AppleWatchDataViewModel: ObservableObject {
    @Published var steps: Int?
    @Published var errorMessage: String?

    private let service = GraphQLService()

    func loadData() {
        service.fetchAppleWatchData { result in
            switch result {
            case .success(let stepCount):
                self.steps = stepCount
            case .failure(let error):
                self.errorMessage = error.localizedDescription
            }
        }
    }
}
