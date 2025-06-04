import Foundation

class GraphQLService {
    private let urlString = "https://bp-gym-tracking-app-be.onrender.com/graphql"

    func checkDevicePairing(deviceUUID: String, completion: @escaping (Result<Bool, Error>) -> Void) {        
        guard let url = URL(string: urlString) else {
            completion(.failure(NSError(domain: "InvalidURL", code: 0)))
            return
        }

        let query = """
            query IsDevicePaired($deviceUUID: String!) {
              isDevicePaired(deviceUUID: $deviceUUID)
            }
            """

        let jsonBody: [String: Any] = [
            "query": query,
            "variables": [
                "deviceUUID": deviceUUID
            ]
        ]

        performRequest(url: url, body: jsonBody) { result in
            switch result {
            case .success(let data):
                // Check for GraphQL errors first
                if let jsonObject = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let errors = jsonObject["errors"] as? [[String: Any]] {
                    print("GraphQL errors: \(errors)")
                    completion(.failure(NSError(domain: "GraphQLError", code: 0, userInfo: [NSLocalizedDescriptionKey: "GraphQL query failed"])))
                    return
                }
                
                do {
                    let decoded = try JSONDecoder().decode(IsDevicePairedResponse.self, from: data)
                    completion(.success(decoded.data.isDevicePaired))
                } catch {
                    completion(.failure(error))
                }
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }

    func fetchWorkoutData(deviceUUID: String, completion: @escaping (Result<WatchesWorkout?, Error>) -> Void) {
        guard let url = URL(string: urlString) else {
            completion(.failure(NSError(domain: "InvalidURL", code: 0)))
            return
        }

        let query = """
            query GetWorkoutForToday($deviceUUID: String!) {
              getWorkoutForToday(deviceUUID: $deviceUUID) {
                id
                plannedWorkoutDay {
                  name
                  plannedExercises {
                    exercise {
                      id
                      name
                    }
                    plannedSets {
                      reps
                      restTime
                    }
                  }
                }
              }
            }
            """

        let jsonBody: [String: Any] = [
                "query": query,
                "variables": [
                    "deviceUUID": deviceUUID
                ]
            ]

        performRequest(url: url, body: jsonBody) { result in
            switch result {
            case .success(let data):
                do {
                    let decoded = try JSONDecoder().decode(GetWorkoutForTodayResponse.self, from: data)
                    let workout = decoded.data.getWorkoutForToday
                    completion(.success(workout))
                } catch {
                    completion(.failure(error))
                }
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
    
    func sendPulseData(deviceUUID: String, pulse: Int, exerciseIndex: Int, setIndex: Int, exerciseId: String, calendarDayId: String, completion: @escaping (Result<Bool, Error>) -> Void) {
           guard let url = URL(string: urlString) else {
               completion(.failure(NSError(domain: "InvalidURL", code: 0, userInfo: nil)))
               return
           }

           let mutation = """
           mutation SendPulseData($avgPulse: Int!, $exerciseIndex: Int!, $setIndex: Int!, $exerciseId: String!, $deviceUUID: String!, $calendarDayId: String!) {
             sendPulseData(avgPulse: $avgPulse, exerciseIndex: $exerciseIndex, setIndex: $setIndex, exerciseId: $exerciseId, deviceUUID: $deviceUUID, calendarDayId: $calendarDayId)
           }
           """

           let variables: [String: Any] = [
               "avgPulse": pulse,
               "exerciseIndex": exerciseIndex,
               "setIndex": setIndex,
               "exerciseId": exerciseId,
               "deviceUUID": deviceUUID,
               "calendarDayId": calendarDayId
           ]

           let body: [String: Any] = [
               "query": mutation,
               "variables": variables
           ]

           performRequest(url: url, body: body) { result in
               switch result {
               case .success(let data):
                   do {
                       let decoded = try JSONDecoder().decode(SendPulseDataResponse.self, from: data)
                       let success = decoded.data.sendPulseData
                       completion(.success(success))
                   } catch {
                       completion(.failure(error))
                   }
               case .failure(let error):
                   completion(.failure(error))
               }
           }
       }
    
    // MARK: - Private Helper Methods
    private func performRequest(url: URL, body: [String: Any], completion: @escaping (Result<Data, Error>) -> Void) {
        guard let bodyData = try? JSONSerialization.data(withJSONObject: body) else {
            completion(.failure(NSError(domain: "JSONSerialization", code: 0)))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = bodyData

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
                return
            }

            guard let data = data else {
                DispatchQueue.main.async {
                    completion(.failure(NSError(domain: "NoData", code: 0)))
                }
                return
            }

            DispatchQueue.main.async {
                completion(.success(data))
            }
        }.resume()
    }
}

// MARK: - Helper Models
struct IsDevicePairedResponse: Decodable {
    let data: PairingData
    
    struct PairingData: Decodable {
        let isDevicePaired: Bool
    }
}

struct GetWorkoutForTodayResponse: Decodable {
    let data: DataContainer

    struct DataContainer: Decodable {
        let getWorkoutForToday: WatchesWorkout?
    }
}

struct WatchesWorkout: Decodable {
    let id: String?
    let plannedWorkoutDay: WatchesWorkoutDay?
}

struct WatchesWorkoutDay: Decodable {
    let name: String?
    let plannedExercises: [WatchesPlannedExercise]?
}

struct WatchesPlannedExercise: Decodable {
    let exercise: WatchesExercise?
    let plannedSets: [WatchesPlannedSet]?
}

struct WatchesExercise: Decodable {
    let id: String?
    let name: String?
}

struct WatchesPlannedSet: Decodable {
    let reps: Int?
    let restTime: Int?
}

struct SendPulseDataResponse: Decodable {
    let data: MutationData
}

struct MutationData: Decodable {
    let sendPulseData: Bool
}
