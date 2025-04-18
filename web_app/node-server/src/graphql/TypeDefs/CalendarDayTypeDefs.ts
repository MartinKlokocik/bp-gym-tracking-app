const CalendarDayTypeDefs = `
  type Query {
    getCalendarDayByDate(date: String!): CalendarDay
  }

  type Mutation {
    createCalendarDay(input: CalendarDayCreateInput!): CalendarDay!
    deleteCalendarDay(date: String!): Boolean!
  }
`;

export default CalendarDayTypeDefs;
