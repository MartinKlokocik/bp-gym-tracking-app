const CalendarDayTypeDefs = `
  type CalendarDay {
    id: String!
    userId: String!
    date: String!
    plannedWorkoutDayId: String!
  }

  input CalendarDayInput {
    userId: String!
    date: String!
    plannedWorkoutDayId: String!
  }

  type Mutation {
    createCalendarDay(input: CalendarDayInput!): CalendarDay!
  }
`;

export default CalendarDayTypeDefs;