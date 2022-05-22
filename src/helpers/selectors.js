
export function getAppointmentsForDay(state,day) {
  let result = [];
  const singleDay = state.days.filter(_day => _day.name === day); /// id 1, name monday, appointments: []...

  if (singleDay.length > 0) {
    const appArr = singleDay[0].appointments; // array like [1.2,3]
    for (const item of appArr) {
      if (state.appointments[item]) {
        result.push(state.appointments[item]);
      }
    }
  }
return result;
};


// Second way to more efficiently write getAppointmentsForDay
//  export function getAppointmentsForDay(state, day) {
//   const dayMatch = state.days
//     .find(_day => _day.name === day) || 
//     { appointments: [] };
//   return [...dayMatch.appointments]
//     .map(appId => state.appointments[appId]) // map transforms the array, which is why spread operator was used above
//     .filter(i => i); // filter out nulls, undefined, falsy values -- keep in mind 0 could be a risk here
// }
