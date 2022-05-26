import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // Books a new interview / edits an interview by updating the database, then setting the new React state
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(state, appointments, id)
        });
      });
  }

  // Cancels an interview by updating the database (setting interview to null) and then setting the new React state
  function cancelInterview(id) {
    const newAppointment = {
      ...state.appointments[id], // copies all the old values for that one appointment
      interview: null // replace the current value of the interview key with the new value
    };
    const newAppointments = {
      ...state.appointments,
      [id]: newAppointment // replace the old appointmnet at this ID with the updated version coming in 
    };

    return axios
      .delete(`api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments: newAppointments,
          days: updateSpots(state, newAppointments, id)
        });
      });
  }

  // Requests all necessary data from the API and adds it to the current state 
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  // Returns the new value of spots as a new days object. Calculates the new remaining spots and sets the spots value in the new days object
  const updateSpots = function(state, appointments, id) {
    const currentDay = state.days.find((day) => day.name === state.day); // find current day
    const dayIndex = state.days.findIndex((day) => day.name === state.day); // find index of current day
    const appointmentIdsArray = currentDay.appointments; // access the appointment ids array for the current day

    let remainingSpots = 0;
    for (const appointmentId of appointmentIdsArray) {
      if (appointments[appointmentId].interview === null) {
        remainingSpots = remainingSpots + 1;
      }
    }

    const updatedDay = {
      ...state.days[dayIndex],
      spots: remainingSpots
    };

    const updatedDays = [...state.days];
    updatedDays[dayIndex] = updatedDay; // copy of state.days at correct index is set to value of updatedDay

    return updatedDays;
  };

  return { state, setDay, bookInterview, cancelInterview };
}