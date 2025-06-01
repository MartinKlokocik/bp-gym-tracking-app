import Foundation

class DeviceManager: ObservableObject {
    @Published var deviceUUID: String = ""
    @Published var isPaired: Bool = false
    @Published var isCheckingPairing: Bool = false
    @Published var pairingError: String?
    
    private let graphQLService = GraphQLService()
    private var hasChecked = false
    
    init() {
        setupDeviceUUID()
    }
    
    private func setupDeviceUUID() {
        if let existingUUID = KeychainHelper.getDeviceUUID() {
            deviceUUID = existingUUID
            print("Loaded existing UUID: \(deviceUUID)")
        } else {
            let newUUID = generateShortDeviceID()
            deviceUUID = newUUID
            _ = KeychainHelper.saveDeviceUUID(newUUID)
            print("Generated new UUID: \(deviceUUID)")
        }
    }

    private func generateShortDeviceID() -> String {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return String((0..<6).map { _ in characters.randomElement()! })
    }
    
    func checkPairingStatus() {
        guard !isCheckingPairing && !hasChecked else { 
            print("Skipping pairing check - already checking or checked")
            return 
        }
        
        print("Starting pairing check for UUID: \(deviceUUID)")
        isCheckingPairing = true
        pairingError = nil
        hasChecked = true
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
            if self.isCheckingPairing {
                print("Pairing check timed out")
                self.isCheckingPairing = false
                self.pairingError = "Request timed out"
                self.isPaired = false
            }
        }
        
        graphQLService.checkDevicePairing(deviceUUID: deviceUUID) { [weak self] result in
            DispatchQueue.main.async {
                guard let self = self, self.isCheckingPairing else { 
                    print("Pairing check completed but state already changed")
                    return 
                }
                
                print("Got pairing response")
                self.isCheckingPairing = false
                
                switch result {
                case .success(let pairedStatus):
                    print("Device paired: \(pairedStatus)")
                    self.isPaired = pairedStatus
                    self.pairingError = nil
                    
                case .failure(let error):
                    print("Pairing check failed: \(error)")
                    self.pairingError = "Failed: \(error.localizedDescription)"
                    self.isPaired = false
                }
            }
        }
    }
    
    func refreshPairingStatus() {
        hasChecked = false
        checkPairingStatus()
    }
    
    func resetPairingCheck() {
        hasChecked = false
    }
} 
