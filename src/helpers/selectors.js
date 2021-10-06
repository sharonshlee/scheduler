export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find((item) => item.name === day);

  if (!filteredDay) {
    return [];
  }
  // returns an array of appointments for that day
  return filteredDay.appointments.map((appId) => state.appointments[appId]);
}

export function getInterview(state, interview) {
  // sample input:
  // interview object = { student: "Sylvia Palmer", interviewer: 2 },

  return interview
    ? {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
  // sample output:
  // return a new interview object
  // {
  //   "student": "Lydia Miller-Jones",
  //   "interviewer": {
  //     "id": 1,
  //     "name": "Sylvia Palmer",
  //     "avatar": "https://i.imgur.com/LpaY82x.png"
  //   }
  // }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((item) => item.name === day);

  if (!filteredDay) {
    return [];
  }
  // returns an array of interviewers for that day
  return filteredDay.interviewers.map((intId) => state.interviewers[intId]);
}
