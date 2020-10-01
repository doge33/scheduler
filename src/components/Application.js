import React, { useState, useEffect} from "react";
import axios from "axios";

import DayList from "./DayList";
//import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment/index";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";

import "components/Application.scss";

axios.defaults.baseURL = "http://localhost:8001"



export default function Application(props) {

  //combine all state into one object 
  const [state, setState] = useState({
    //all the initial state values
    day: "Monday",
    days: [],
    interviewers: [],
  })
  
  
  //const state = {day: "Monday", days: []};
  //setState({...state, day: "Tuesday"})

  const setDay = day => setState({...state, day});
  //const setDays = days => setState(prev => ({...prev, days}));

  //const [selectedInterviewer, setSelectedInterviewer] = useState(interviewers[2].name);

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
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        <ul>
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          //console.log("in mapping of appointments in Application; ")
          return (
          <Appointment 
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}

            //{...appointment}
            />
        )}
        )}    
        </ul>
      </section>
    </main>
  );
}

/*
<h1>Interview Schedules</h1>
        <InterviewerList 
          interviewers={interviewers}
          selectedInterviewer={selectedInterviewer}
          setSelectedInterviewer={setSelectedInterviewer}
        />
*/