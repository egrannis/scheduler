import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {}
  });

  const dailyAppointments = [];

  // setState({...state, day: "Tuesday"}); was this just an example? tf

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect (() => {
    Promise.all([
    axios.get("api/days"), //need help here, wont work with just /api/days
    axios.get("api/appointments"),
    // axios.get("api/interviewers")
  ])
    .then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
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
              {...appointment}
            />
          );
        })
        }
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}