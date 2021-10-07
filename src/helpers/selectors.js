export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find((item) => item.name === day);

  if (!filteredDay) {
    return [];
  }
  // returns an array of appointments for that day
  return filteredDay.appointments.map((appId) => state.appointments[appId]);
}

export function getInterview(state, interview) {
  // return a new interview object with interview details
  return interview
    ? {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((item) => item.name === day);

  if (!filteredDay) {
    return [];
  }
  // returns an array of interviewers for that day
  return filteredDay.interviewers.map((intId) => state.interviewers[intId]);
}
