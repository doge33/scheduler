import { useState, useEffect} from "react";
import axios from "axios";


export default function useApplicationData() {

  //combine all state into one object 
  const [state, setState] = useState({
    //all the initial state values
    day: "Monday",
    days: [],
    interviewers: [],

  })
  

  const setDay = day => setState({...state, day});

    
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


  function bookInterview(id, interview) { //this function will change the local state --> what id?
    
    const appointment = {//creating a new appointment object once (interview is) booked.
      ...state.appointments[id], //make a copy of everything from a certain appointment
      interview: { ...interview } //make a copy of the argument "interview", replace the current interview value(null) in the appointment with it(now booked so it's an object)
    };

    const appointments = { //update the whole appointments state after updating that single appointment 
      ...state.appointments, //again, make a copy
      [id]: appointment   //only update the one with the matching key (the one that's booked)
    };

    return axios.put(`/api/appointments/${appointment.id}`, {interview}) //return promise to be handled in appointment component
    .then(() => {
      setState({...state, appointments});
      //console.log("axios.put success")
    })
    .catch(err => {
      console.log(err.message);
      err.status(500).json({})
    })
  }

  function cancelInterview(id, interview){
   
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${appointment.id}`, {interview})
    .then((res) => {
      setState({...state, appointments}) //==> adding this broke my code. WHY?
      //console.log("axios.delete success")
    })
    .catch(err => {
      //console.log(err.message)
      err.status(500).json({})
    })
  }

  return {state, setDay, bookInterview, cancelInterview}
}