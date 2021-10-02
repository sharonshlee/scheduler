export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((item) => item.name === day);

  //... returns an array of appointments for that day
  const filteredAppointments = [];
  for (const filteredDay of filteredDays) {
    for (const appointment of filteredDay.appointments) {
      if (state.appointments[appointment]) {
        filteredAppointments.push(state.appointments[appointment]);
      }
    }
  }

  return filteredAppointments;
}

export function getInterview(state, interview) {
  //interview object = { student: "Sylvia Palmer", interviewer: 2 },

  return interview
    ? {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
  //return a new interview object
  // {
  //   "student": "Lydia Miller-Jones",
  //   "interviewer": {
  //     "id": 1,
  //     "name": "Sylvia Palmer",
  //     "avatar": "https://i.imgur.com/LpaY82x.png"
  //   }
  // }
}
