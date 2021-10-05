// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // making our data persistent
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      // setting the local state from the newly updated data from db
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id) {
    console.log("before", state.appointments[id]);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      // set the interview object in state to null
      setState((prev) => ({
        ...prev,
        appointments: {
          ...prev.appointments,
          [id]: { ...prev.appointments[id], interview: null },
        },
      }));
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
