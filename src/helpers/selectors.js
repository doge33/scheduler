export function getAppointmentsForDay(state, day) {

  //find the object in state.days where the name matches the day argument
  const dayFound = state.days.find(dayObj => dayObj.name === day);

  //if the day doesn't exist
  if (!dayFound) {  
    return [];
  }
  //access the array of appointments(id)s for that day, 
  //return an array of appointments where the state.appointments id matches the accessed appointment ids.
  const appointmentsForDay = dayFound.appointments.map((appointmentID) => {
    return state.appointments[appointmentID]
  });
  return appointmentsForDay;
};
 
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
    //return null if no interview exists
    return null;
};

export function getInterviewersForDay(state, day) {

  const dayFound = state.days.find(dayObj => dayObj.name === day);

  if (!dayFound) {
    return [];
  }

  const interviewersForDay = dayFound.interviewers.map((interviewerID) => {
    return state.interviewers[interviewerID]
  });
  return interviewersForDay;
};