import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [dailyInterviewers, setDailyInterviewers] = useState([]);

  const setDay = (day) => setState({ ...state, day });

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

  useEffect(() => {
    setDailyAppointments(getAppointmentsForDay(state, state.day));
  }, [state, setDailyAppointments]);

  useEffect(() => {
    setDailyInterviewers(getInterviewersForDay(state, state.day));
  }, [state, setDailyInterviewers]);

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

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
