export function getAppointmentsForDay(state, day) {
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

export function getInterview(state, interview) {
  //receive an interview object with 1. student name, 2 the interviewer's id;
  //return an interviewInfo object that contains the longer version of the interview, containing details of interviewer

  //1. take interviewer.id from parameter "interview", use the id to look for the corresponding interviewer in state
    if (interview) {
      const interviewerID = interview.interviewer;
      const interviewerDetails = state.interviewers[interviewerID]
      const fullInterviewInfo = {...interview, interviewer: interviewerDetails};

      return fullInterviewInfo;
    };
    return null;
}

