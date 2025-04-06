import Foundation

class GraphQLService {
    private let urlString = "https://8b03-158-195-208-150.ngrok-free.app/graphql"
    // 1. We'll have a function to fetch Apple Watch data
    func fetchAppleWatchData(completion: @escaping (Result<Int, Error>) -> Void) {
        // The GraphQL endpoint
        guard let url = URL(string: urlString) else {
            // If for some reason the URL is invalid, fail immediately
            completion(.failure(NSError(domain: "InvalidURL", code: 0)))
            return
        }

        // 2. Define the query
        let query = """
        query GetDataForAppleWatch {
            getDataForAppleWatch {
                steps
            }
        }
        """

        // 3. Build the JSON body
        let jsonBody: [String: Any] = [
            "query": query
        ]

        // 4. Convert to Data
        guard let bodyData = try? JSONSerialization.data(withJSONObject: jsonBody) else {
            completion(.failure(NSError(domain: "JSONSerialization", code: 0)))
            return
        }

        // 5. Prepare the URLRequest
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = bodyData

        // 6. Make the network call
        URLSession.shared.dataTask(with: request) { data, response, error in
            // 7. Check for client/network error
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

            // 8. Decode the JSON response
            do {
                // The response from GraphQL typically looks like:
                // {
                //   "data": {
                //     "getDataForAppleWatch": { "steps": 10000 }
                //   }
                // }
                let decodedResponse = try JSONDecoder().decode(AppleWatchDataResponse.self, from: data)
                let steps = decodedResponse.data.getDataForAppleWatch.steps

                // 9. Return steps on main thread
                DispatchQueue.main.async {
                    completion(.success(steps))
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

           // 1. GraphQL mutation string
           let mutation = """
           mutation SendPulseData($pulseData: Int!) {
             sendPulseData(pulseData: $pulseData)
           }
           """

           // 2. Variables
           let variables: [String: Any] = [
               "pulseData": pulse
           ]

           // 3. JSON body
           let body: [String: Any] = [
               "query": mutation,
               "variables": variables
           ]

           guard let bodyData = try? JSONSerialization.data(withJSONObject: body, options: []) else {
               completion(.failure(NSError(domain: "JSONSerialization", code: 0, userInfo: nil)))
               return
           }

           // 4. Build request
           var request = URLRequest(url: url)
           request.httpMethod = "POST"
           request.setValue("application/json", forHTTPHeaderField: "Content-Type")
           request.httpBody = bodyData

           // 5. Perform request
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

               // 6. Decode the response
               // Example GraphQL response:
               // {
               //   "data": {
               //       "sendPulseData": true
               //   }
               // }
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
struct AppleWatchDataResponse: Decodable {
    let data: AppleWatchDataContainer
}

struct AppleWatchDataContainer: Decodable {
    let getDataForAppleWatch: StepsInfo
}

struct StepsInfo: Decodable {
    let steps: Int
}
struct SendPulseDataResponse: Decodable {
    let data: MutationData
}

struct MutationData: Decodable {
    let sendPulseData: Bool
}
//
//  GraphQLService.swift
//  gym tracker
//
//  Created by Martin Klokočík on 06/04/2025.
//

