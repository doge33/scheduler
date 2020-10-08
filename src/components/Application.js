import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";

export default function Application() {
//-------------------initial state is set---------------
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData(); 

  //---------------get necessary daily appointment & interviewers data from state
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //render 2 components DayList & list of Appointment
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
};

