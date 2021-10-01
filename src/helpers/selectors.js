export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((item) => item.name === day);

  //... returns an array of appointments for that day
  const filteredAppointments = [];
  for (const filteredDay of filteredDays) {
    for (const appointment of filteredDay.appointments) {
      filteredAppointments.push(state.appointments[appointment]);
    }
  }

  return filteredAppointments;
}
