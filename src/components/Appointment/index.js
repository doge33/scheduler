import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

 
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";


  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW:EMPTY
  )

  function save(name, interviewer) { //save the info to be displayed (saved to local)
    const interview = {
      student: name,
      interviewer
    };
  
  transition(SAVING)

  props.bookInterview(props.id, interview) //the purpose is to update the database
  .then(() => transition(SHOW))
  .catch(err =>err.message )
  //.then(()=>{
    
  //}) //appointment id and newly created interview with student name + interview object

    
  }

console.log("the props.message being passed into appointment component is", props.message)
  return(
    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status message={props.message} />}

      {mode === CREATE &&  
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          
        />
      }

      {mode === SHOW && 
        <Show 
          student={props.interview.student}
          //interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          interview={props.interview}
        />
        }
      
      

    </article>
  )

}