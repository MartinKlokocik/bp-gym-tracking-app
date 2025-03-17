const CalendarDayTypeDefs = `
  type Query {
    getCalendarDayByDate(date: String!): CalendarDay
  }

  type Mutation {
    createCalendarDay(input: CalendarDayCreateInput!): CalendarDay!
  }
`;

export default CalendarDayTypeDefs;
