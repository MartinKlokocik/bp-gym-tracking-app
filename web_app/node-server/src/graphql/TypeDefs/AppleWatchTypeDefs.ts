const AppleWatchTypeDefs = `
  type AppleWatchData {
    steps: Int
    }  
  type Query {
    getDataForAppleWatch: AppleWatchData
  }
  type Mutation {
    sendPulseData(pulseData: Int!): Boolean
  }
`;

export default AppleWatchTypeDefs;
