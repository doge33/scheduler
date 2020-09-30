import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {

  return(
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? 
      <Show 
        student={props.student}
        interviewer={props.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        interview={props.interview}
      /> : 
      <Empty onAdd={props.onAdd} />
      }

    </article>
  )

}