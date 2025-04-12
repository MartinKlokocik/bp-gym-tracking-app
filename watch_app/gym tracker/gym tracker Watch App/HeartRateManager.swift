import HealthKit
import Combine
import Foundation
import SwiftUI

class HeartRateManager: NSObject, ObservableObject {
    @Published var currentHeartRate: Double?
    @Published var statusMessage: String?
    @Published var isMonitoring = false

    private let service = GraphQLService()
    private let healthStore = HKHealthStore()
    private var workoutSession: HKWorkoutSession?
    private var query: HKQuery?
    private var heartRates: [Double] = []

    // Request permission to read heart rate data
    func requestHealthKitAuthorization() {
        guard HKHealthStore.isHealthDataAvailable() else {
            DispatchQueue.main.async {
                self.statusMessage = "Health data not available on this device."
            }
            return
        }
        
        guard let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate) else {
            return
        }
        
        let typesToShare: Set<HKSampleType> = []
        let typesToRead: Set<HKObjectType> = [heartRateType]
        
        healthStore.requestAuthorization(toShare: typesToShare, read: typesToRead) { success, error in
            DispatchQueue.main.async {
                if success {
                    self.statusMessage = "HealthKit authorized successfully."
                } else {
                    self.statusMessage = "HealthKit authorization failed."
                }
            }
        }
    }

    // Start monitoring heart rate
    func startMonitoring() {
        guard !isMonitoring else { return }
        
        // Reset recorded heart rates
        heartRates.removeAll()
        isMonitoring = true
        statusMessage = "Monitoring heart rate..."
        
        // Start a workout session to get continuous heart rate updates
        let configuration = HKWorkoutConfiguration()
        configuration.activityType = .other
        configuration.locationType = .unknown
        
        do {
            workoutSession = try HKWorkoutSession(healthStore: healthStore, configuration: configuration)
            workoutSession?.delegate = self
            workoutSession?.startActivity(with: Date())
        } catch {
            statusMessage = "Failed to start workout session: \(error.localizedDescription)"
            isMonitoring = false
            return
        }
        
        startHeartRateQuery()
    }
    
    private func startHeartRateQuery() {
        guard let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate) else { return }
        // Only fetch samples from now on
        let predicate = HKQuery.predicateForSamples(withStart: Date(), end: nil, options: .strictStartDate)
        
        let anchoredQuery = HKAnchoredObjectQuery(type: heartRateType,
                                                  predicate: predicate,
                                                  anchor: nil,
                                                  limit: HKObjectQueryNoLimit) { [weak self] query, samples, deletedObjects, anchor, error in
            self?.processHeartRateSamples(samples)
        }
        
        anchoredQuery.updateHandler = { [weak self] query, samples, deletedObjects, anchor, error in
            self?.processHeartRateSamples(samples)
        }
        
        query = anchoredQuery
        healthStore.execute(anchoredQuery)
    }
    
    private func processHeartRateSamples(_ samples: [HKSample]?) {
        guard let samples = samples as? [HKQuantitySample] else { return }
        
        for sample in samples {
            let unit = HKUnit.count().unitDivided(by: HKUnit.minute())
            let bpm = sample.quantity.doubleValue(for: unit)
            DispatchQueue.main.async {
                self.currentHeartRate = bpm
            }
            heartRates.append(bpm)
        }
    }

    // Stop monitoring and send average pulse to the server
    func stopMonitoring(setIndex: Int, exerciseIndex: Int) {
        guard isMonitoring else { return }
        isMonitoring = false
        
        if let workoutSession = workoutSession {
            workoutSession.end()
        }
        
        if let query = query {
            healthStore.stop(query)
        }
        
        // Calculate average heart rate
        let avgBPM: Double
        if heartRates.isEmpty {
            avgBPM = 0
        } else {
            avgBPM = heartRates.reduce(0, +) / Double(heartRates.count)
        }
        let averagePulse = Int(avgBPM)
        
        sendAveragePulseToServer(averagePulse, setIndex: setIndex, exerciseIndex: exerciseIndex)
    }
    
    // Send the computed average pulse to the server
    private func sendAveragePulseToServer(_ avgPulse: Int, setIndex: Int, exerciseIndex: Int) {
        service.sendPulseData(pulse: avgPulse, exerciseIndex: exerciseIndex, setIndex: setIndex) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let success):
                    if success {
                        self.statusMessage = "Average pulse \(avgPulse) sent successfully!"
                    } else {
                        self.statusMessage = "Server returned false."
                    }
                case .failure(let error):
                    self.statusMessage = "Error sending data: \(error.localizedDescription)"
                }
            }
        }
    }
}

// MARK: - HKWorkoutSessionDelegate
extension HeartRateManager: HKWorkoutSessionDelegate {
    @objc func workoutSession(
        _ workoutSession: HKWorkoutSession,
        didChangeTo toState: HKWorkoutSessionState,
        from fromState: HKWorkoutSessionState,
        date: Date
    ) {
    }
    
    @objc func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {
        DispatchQueue.main.async {
            self.statusMessage = "Workout session error: \(error.localizedDescription)"
            self.isMonitoring = false
        }
    }
}
