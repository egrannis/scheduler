import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {
      ...state, 
      appointments: appointments // overrides appointments in line 37
    };
    
    return axios 
      .put(`api/appointments/${id}`, appointment)
      .then(() => {
        setState(newState)
      })
      .catch((err) => console.log('error:', err));
  }

  function cancelInterview(id) {
    const newAppointment = {
      ...state.appointments[id], // copies all the old values for that one appointment
      interview: null // replace the current value of the interview key with the new value
    };
    const newAppointments = {
      ...state.appointments,
      [id]: newAppointment // replace the old appointmnet at this ID with the updated version coming in (line 46-49)
    };
    const newState = {
      ...state,
      appointments: newAppointments // refer to const state, setstate on line 8 for reference about valid keys
    }

    return axios
    .delete(`api/appointments/${id}`)
    .then (() => {
      setState(newState);
    })
    .catch((err) => console.log('error', err));
  }

  useEffect (() => {
    Promise.all([
    axios.get("api/days"), 
    axios.get("api/appointments"),
    axios.get("api/interviewers")
  ])
    .then((all) => {
      // console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={appointment.interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })
        }
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}