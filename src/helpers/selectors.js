
// Finds appointments for a specific day, pushes them into a new array, and returns the value
export function getAppointmentsForDay(state, day) {
  let result = [];

  const singleDay = state.days.filter(_day => _day.name === day); /// id 1, name monday, appointments: [].... If there are no days that meet the filter requirements, then it just gives an empty array

  if (singleDay.length > 0) {
    const appArr = singleDay[0].appointments;
    for (const item of appArr) {
      if (state.appointments[item]) {
        result.push(state.appointments[item]);
      }
    }
  }
  return result;
};

// Gets the current interview object from state and adds the chosen inteviewer to it
export function getInterview(state, interview) {
  let result = null;
  if (interview) {
    const interviewerId = interview.interviewer;
    const indivInterview = state.interviewers[interviewerId]; // object 
    result = {
      student: interview.student,
      interviewer: indivInterview,
    };
  }
  return result;
};

// Gets the interviewers that are assigned for a specific day
export function getInterviewersForDay(state, day) {
  let result = [];
  const singleDay = state.days.filter(_day => _day.name === day); // If there are no days that meet the filter requirements, then it just gives an empty array

  if (singleDay.length > 0) {
    const appArr = singleDay[0].interviewers;
    for (const item of appArr) {
      if (state.interviewers[item]) {
        result.push(state.interviewers[item]);
      }
    }
  }
  return result;
};
