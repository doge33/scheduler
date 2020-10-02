export function getAppointmentsForDay(state, day) {
  //find the object in state.days where the name matches the day input
  //use the matching object, access the array of appointments(id)s for that day, return an array of appointments where the state.appointments id matches the accessed appointment ids.

//refactor by using find()
  const dayFound = state.days.find(dayObj => dayObj.name === day)

  if (!dayFound) { //if the day doesn't exist 
    return [];
  }

  const appointmentsForDay = dayFound.appointments.map((appointmentID) => {
    return state.appointments[appointmentID]
  })
  return appointmentsForDay;
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

export function getInterviewersForDay(state, day) {
  //find the object in state.days where the name matches the day input
  //use the matching object, access the array of interviewer(id)s for that day, return an array of interviewers where the state.interviewers id matches the accessed interviewer ids.

//refactor by using find()
  const dayFound = state.days.find(dayObj => dayObj.name === day)

  if (!dayFound) { //if the day doesn't exist 
    return [];
  }

  const interviewersForDay = dayFound.interviewers.map((interviewerID) => {
    return state.interviewers[interviewerID]
  })
  return interviewersForDay;
}