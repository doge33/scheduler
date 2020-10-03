import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

 
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


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
  .catch(err => {
    console.log("Error message:~~~", err);
    transition(ERROR_SAVE, true)
  } )
  //.then(()=>{
    
  //}) //appointment id and newly created interview with student name + interview object

  }

  function deleteAppointment(interview) {

    transition(DELETING); //this line is important(don't know if for the right reason tho?? deleting it would break code)
    interview = null;
    
  
    props.cancelInterview(props.id, interview)
        .then(() => {
          console.log("after axios.delete, inside deleteAppointment function; props is: -----", props)
          transition(EMPTY)})
        .catch(err => {
          console.log("Error message:~~~", err);
          transition(ERROR_DELETE, true)
        });
  
    
  }

  
  
  
  //console.log("the props.message being passed into appointment component is", props.message)
  return(
    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={deleteAppointment} onCancel={() => back()}/>}

      {mode === SAVING && <Status message={props.message} />}

      {mode === DELETING && <Status message={props.message} />}

      {mode === ERROR_DELETE && <Error message={"Something wrong!"} />}
      {mode === ERROR_SAVE && <Error message={"Can't Save the appointment!"} />}



      {mode === CREATE &&  
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          
        />
      }

      {mode === EDIT &&  
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
          
        />
      }


      {mode === SHOW && 
        <Show 
          student={props.interview.student}
          //interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          //onDelete={props.onDelete}
          onDelete={() => transition(CONFIRM)}
          interview={props.interview}
        />
        }
      
      

    </article>
  )

}