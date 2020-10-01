export default function getAppointmentsForDay(state, day) {
  //1. find the object in state.days where the name matches the day input
  //use the matching object, access the array of appointments(id)s for that day, 
  let appointmentIDsForDay = null;
  
  for (const dayObj of state.days) {
    if (day === dayObj.name) {
      appointmentIDsForDay = dayObj.appointments;
    } 
  }
  
  //2. return an array of appointments where the state.appointments id matches the accessed appointment ids.
  const appointmentsForDay = !appointmentIDsForDay? [] : appointmentIDsForDay.map((id) => {
    return id === state.appointments[id].id ? state.appointments[id]: null;
  });
  return appointmentsForDay
}