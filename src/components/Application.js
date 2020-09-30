import React, { useState} from "react";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment/index";

import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
/*
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];
*/

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: "4",
    time: "3pm",
    interview: {
      student: "Harry Potter",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: "last",
    time: "4pm",
  }

];

export default function Application(props) {

  const [day, setDay] = useState("Monday");
  //const [selectedInterviewer, setSelectedInterviewer] = useState(interviewers[2].name);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={days}
              day={day}
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
        {appointments.map((appointment) => {
          console.log("in mapping of appointments in Application; ")

          return (
          <Appointment 
            key={appointment.id}
            {...appointment}
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