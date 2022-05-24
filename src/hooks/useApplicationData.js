import React, { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [], 
  appointments: {},
  interviewers: {}
});

const setDay = day => setState({ ...state, day });

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
    // .catch((err) => console.log('error:', err));
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
  // .catch((err) => console.log('error', err));
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

return { state, setDay, bookInterview, cancelInterview };

}