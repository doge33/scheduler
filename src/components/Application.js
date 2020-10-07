import React from "react";
//import axios from "axios";

import DayList from "./DayList";
//import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";

//axios.defaults.baseURL = "http://localhost:8001"



export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //console.log("before changing spots; state.days is ~~~", state.days)


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
          return (
          <Appointment 
            key={appointment.id}
            {...appointment} //including (name and) time
            interview={interview}
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
             />
        )}
        )}
        <Appointment key="last" time="5pm" />    
        </ul>
      </section>
    </main>
  );
}

