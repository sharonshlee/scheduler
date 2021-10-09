import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  // The setDay action can be used to set the current day.
  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (state, appointments) => {
    return state.days.map((day) => ({
      ...day,
      spots: day.appointments.filter((appId) => !appointments[appId].interview)
        .length,
    }));
  };
  // The bookInterview action makes an HTTP request and updates the local state.
  function bookInterview(id, interview) {
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
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments),
      });
    });
  }

  // The cancelInterview action makes an HTTP request and updates the local state.
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointments = {
        ...state.appointments,
        // set the interview object in local state to null to cancel the appointment
        [id]: { ...state.appointments[id], interview: null },
      };
      setState((state) => ({
        ...state,
        days: updateSpots(state, appointments),
        appointments,
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
