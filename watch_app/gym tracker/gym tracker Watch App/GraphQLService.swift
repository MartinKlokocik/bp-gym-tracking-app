import Foundation

class GraphQLService {
    private let urlString = "https://96be-213-81-189-105.ngrok-free.app/graphql"
    private let userId = "4116f715-df81-4887-8010-6c77f300eea7"

    func fetchWorkoutData(completion: @escaping (Result<WatchesWorkout?, Error>) -> Void) {
        guard let url = URL(string: urlString) else {
            completion(.failure(NSError(domain: "InvalidURL", code: 0)))
            return
        }

        let query = """
            query GetWorkoutForToday($userId: String!) {
              getWorkoutForToday(userId: $userId) {
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
                    "userId": userId
                ]
            ]

        guard let bodyData = try? JSONSerialization.data(withJSONObject: jsonBody) else {
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

            do {
                let decoded = try JSONDecoder().decode(GetWorkoutForTodayResponse.self, from: data)
                let workout = decoded.data.getWorkoutForToday

                DispatchQueue.main.async {
                    completion(.success(workout))
                }
            } catch {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
    
    func sendPulseData(pulse: Int, completion: @escaping (Result<Bool, Error>) -> Void) {
           guard let url = URL(string: urlString) else {
               completion(.failure(NSError(domain: "InvalidURL", code: 0, userInfo: nil)))
               return
           }

           let mutation = """
           mutation SendPulseData($pulseData: Int!) {
             sendPulseData(pulseData: $pulseData)
           }
           """

           let variables: [String: Any] = [
               "pulseData": pulse
           ]

           let body: [String: Any] = [
               "query": mutation,
               "variables": variables
           ]

           guard let bodyData = try? JSONSerialization.data(withJSONObject: body, options: []) else {
               completion(.failure(NSError(domain: "JSONSerialization", code: 0, userInfo: nil)))
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
                       completion(.failure(NSError(domain: "NoData", code: 0, userInfo: nil)))
                   }
                   return
               }

               do {
                   let decoded = try JSONDecoder().decode(SendPulseDataResponse.self, from: data)
                   let success = decoded.data.sendPulseData

                   DispatchQueue.main.async {
                       completion(.success(success))
                   }
               } catch {
                   DispatchQueue.main.async {
                       completion(.failure(error))
                   }
               }
           }.resume()
       }
}

// MARK: - Helper Models
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
