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

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    //save to local
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    //update database
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true));
  };

  function deleteAppointment(interview) {

    transition(DELETING, true);
    interview = null;

    props.cancelInterview(props.id, interview)
        .then(() => transition(EMPTY))
        .catch(err => transition(ERROR_DELETE, true));
  };

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={deleteAppointment} onCancel={back}/>}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === ERROR_DELETE && <Error message={"Can't delete the appointment!"} onClose={back}/>}
      {mode === ERROR_SAVE && <Error message={"Can't save the appointment!"} onClose={back} />}

      {mode === CREATE &&  
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} 
        />
      }

      {mode === EDIT &&  
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      }

      {mode === SHOW && 
        <Show 
          student={props.interview.student}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          interview={props.interview}
        />
      }
    </article>
  );
};