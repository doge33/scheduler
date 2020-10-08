import { useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData() {

  //--------------------------all state into one object --------------------------
  const [state, setState] = useState({
    //all the initial state values
    day: "Monday",
    days: [],
    interviewers: [],
  })
  
  const setDay = day => setState({...state, day});

  //------------------------side effect: get 3 different groups of data from api, handle them altogether by updating the state--------------
  useEffect(() => {
    
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch(err => console.log("caught error ---", err.message))
  }, []);

  
  //-------------------------function that manages spots remaning features; returns the new Days state to be updated to ----------------
  const newDays = function(days, interview) {
    const currentDay = days.find(singleDay => singleDay.name === state.day);
    //check if the appointment in question has interview === null
    interview ? currentDay.spots -= 1 : currentDay.spots += 1;
    return days
  }
 
  //----------------function that updates the state locally & remotely when booking interview--------------------
  function bookInterview(id, interview) {

    //creating a new appointment object once (interview is) booked.
    const appointment = {
      ...state.appointments[id], //make a copy of everything from a certain appointment
      interview: { ...interview } //make a copy of the argument "interview", replace the current interview value(null) in the appointment
    };
    
    //new appointment state
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //differentiate between EDIT of existing and saving new appointments: check if the interview in appointment already existed
    const newDaysState = state.appointments[id].interview ? [...state.days] : newDays([...state.days], interview);
    
    //return promise to be handled in appointment component
    return axios.put(`/api/appointments/${appointment.id}`, {interview})
    .then(() => setState({...state, appointments, newDaysState}))
    .catch(err => err.status(500).json({}))
  }

  //----------------------function that updates the state locally & remotely when cancelling interview---------------------------------
  function cancelInterview(id, interview){
   
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDaysState = newDays([...state.days], interview);
    
    return axios.delete(`/api/appointments/${appointment.id}`, {interview})
    .then((res) => setState({...state, appointments, newDaysState}))
    .catch(err => {
      console.log(err.message)
      err.status(500).json({})
    });
  };

  return {state, setDay, bookInterview, cancelInterview};
};